import OpenAI from 'openai';
import pool from '../db/db.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const NUTRITIONIST_SYSTEM_PROMPT = `You are a professional nutritionist AI specialized in body recomposition and healthy fat loss. Your recommendations are based on current scientific literature and evidence-based nutrition principles.

## Core Principles

1. **Safety First**: Never recommend:
   - Extreme caloric deficits (<1200 kcal for women, <1500 kcal for men)
   - Elimination of entire macronutrient groups without medical reason
   - Rapid weight loss (>1% body weight per week for most people)
   - Dangerous supplements or unproven methods

2. **Personalization**: Always consider user's BMR, TDEE, activity level, allergies, intolerances, budget, and cultural preferences.

3. **Balanced Approach**:
   - Protein: 1.6-2.2g per kg of body weight for fat loss with muscle preservation
   - Fats: Minimum 0.8g per kg (never below 20% of total calories)
   - Carbs: Fill remaining calories, prioritizing whole grains and vegetables
   - Fiber: Minimum 25-30g daily

4. **Sustainable Habits**: Focus on long-term adherence over short-term results.

You MUST respond ONLY with valid JSON in this exact structure:

{
  "daily_calories": number,
  "macros": {
    "protein_g": number,
    "carbs_g": number,
    "fat_g": number
  },
  "meals": [
    {
      "name": string,
      "time": string,
      "recipes": [
        {
          "title": string,
          "ingredients": [string],
          "instructions": string,
          "macros": {
            "protein": number,
            "carbs": number,
            "fat": number,
            "calories": number
          }
        }
      ]
    }
  ],
  "shopping_list": [
    {
      "item": string,
      "quantity": string
    }
  ],
  "tips": [string]
}`;

export async function generateNutritionPlan(userId, preferences = {}) {
  // Obtener perfil del usuario
  const profileResult = await pool.query(`
    SELECT p.*, u.email
    FROM user_profiles p
    JOIN users u ON u.id = p.user_id
    WHERE p.user_id = $1
  `, [userId]);

  if (profileResult.rows.length === 0) {
    throw new Error('User profile not found');
  }

  const profile = profileResult.rows[0];

  // Validar que tenga datos mínimos
  if (!profile.age || !profile.weight_kg || !profile.height_cm || !profile.tmb) {
    throw new Error('Incomplete profile. Please complete onboarding first.');
  }

  // Construir prompt de usuario
  const userPrompt = `Generate a personalized nutrition plan for:

Age: ${profile.age}
Gender: ${profile.gender || 'not specified'}
Height: ${profile.height_cm} cm
Weight: ${profile.weight_kg} kg
BMR: ${profile.tmb} kcal
Activity level: ${profile.neat || 'moderate'}
Goal: ${profile.goal || 'fat_loss'}
Somatotype: ${profile.somatotype || 'not determined'}
Body fat estimate: ${profile.body_fat_estimate || 'unknown'}%

Allergies: ${profile.allergies?.join(', ') || 'none'}
Intolerances: ${profile.intolerances?.join(', ') || 'none'}
Budget: ${profile.budget || 'medium'}

Preferences:
- Meals per day: ${preferences.meals_per_day || 4}
- Cooking time: ${preferences.cooking_time || 'moderate'}
- Cuisine: ${preferences.cuisine?.join(', ') || 'varied'}

Create a safe, sustainable nutrition plan for ${preferences.duration_weeks || 4} weeks.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: NUTRITIONIST_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000
    });

    const planJson = JSON.parse(completion.choices[0].message.content);

    // Guardar plan en base de datos
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (preferences.duration_weeks || 4) * 7);

    const result = await pool.query(`
      INSERT INTO nutrition_plans (
        user_id, start_date, end_date, goal_type,
        daily_calories, protein_g, carbs_g, fat_g,
        plan_json, ai_model, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, start_date, end_date, daily_calories, status
    `, [
      userId,
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0],
      profile.goal || 'fat_loss',
      planJson.daily_calories,
      planJson.macros.protein_g,
      planJson.macros.carbs_g,
      planJson.macros.fat_g,
      JSON.stringify(planJson),
      'gpt-4-turbo-preview',
      'active'
    ]);

    return {
      plan_id: result.rows[0].id,
      ...planJson,
      start_date: result.rows[0].start_date,
      end_date: result.rows[0].end_date
    };
  } catch (error) {
    console.error('OpenAI error:', error);
    throw new Error('Failed to generate nutrition plan');
  }
}

export async function getUserPlans(userId, limit = 10) {
  const result = await pool.query(`
    SELECT id, start_date, end_date, goal_type, daily_calories,
           protein_g, carbs_g, fat_g, status, created_at
    FROM nutrition_plans
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `, [userId, limit]);

  return result.rows;
}

export async function getPlanById(userId, planId) {
  const result = await pool.query(`
    SELECT *
    FROM nutrition_plans
    WHERE user_id = $1 AND id = $2
  `, [userId, planId]);

  if (result.rows.length === 0) {
    throw new Error('Plan not found');
  }

  const plan = result.rows[0];
  return {
    ...plan,
    plan_json: plan.plan_json // Ya es objeto JSON desde PostgreSQL
  };
}
