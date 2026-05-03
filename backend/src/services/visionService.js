import OpenAI from 'openai';
import pool from '../db/db.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const VISION_SYSTEM_PROMPT = `You are a body composition analysis AI. Analyze the provided image and estimate:

1. **Body Fat Percentage**: Visual estimation based on muscle definition, visible abs, vascularity
2. **Somatotype**: Classify as ectomorph, mesomorph, or endomorph
3. **Confidence Score**: How certain you are (0.0 - 1.0)
4. **Visible Indicators**: Observable features that support your estimation

## Guidelines

- Be conservative in estimates (better to overestimate body fat than underestimate)
- Consider lighting, posing, and image quality in confidence score
- Focus on visible indicators: abdominal definition, shoulder-to-waist ratio, muscle separation
- Never make diagnoses or medical claims

## Body Fat Visual References

- 5-9%: Extremely lean, striations visible, competition level
- 10-14%: Athletic, abs clearly visible, low subcutaneous fat
- 15-19%: Fit, abs visible with good lighting, healthy range
- 20-24%: Average, slight ab definition possible
- 25-29%: Above average, no visible abs
- 30%+: High body fat, health concerns possible

You MUST respond ONLY with valid JSON:

{
  "body_fat_estimate": number (10.0 - 45.0),
  "somatotype": "ectomorph" | "mesomorph" | "endomorph",
  "confidence": number (0.0 - 1.0),
  "visible_indicators": [string],
  "recommendations": [string]
}`;

export async function analyzeBodyComposition(userId, imageUrl, angle = 'front') {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'system',
          content: VISION_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this ${angle} body composition photo. Provide your assessment in JSON format.`
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high'
              }
            }
          ]
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1000
    });

    const analysis = JSON.parse(completion.choices[0].message.content);

    // Guardar análisis en base de datos
    const result = await pool.query(`
      INSERT INTO vision_analyses (
        user_id, photo_url, analysis_result,
        body_fat_estimate, somatotype_detected,
        ai_model, confidence_score
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at
    `, [
      userId,
      imageUrl,
      JSON.stringify(analysis),
      analysis.body_fat_estimate,
      analysis.somatotype,
      'gpt-4-vision-preview',
      analysis.confidence
    ]);

    return {
      analysis_id: result.rows[0].id,
      ...analysis,
      analyzed_at: result.rows[0].created_at
    };
  } catch (error) {
    console.error('Vision API error:', error);
    throw new Error('Failed to analyze image');
  }
}

export async function getUserAnalyses(userId, limit = 10) {
  const result = await pool.query(`
    SELECT id, photo_url, body_fat_estimate, somatotype_detected,
           confidence_score, created_at
    FROM vision_analyses
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `, [userId, limit]);

  return result.rows;
}
