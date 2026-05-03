import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import pool from '../db/db.js';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.email, u.created_at,
             p.age, p.gender, p.height_cm, p.weight_kg,
             p.tmb, p.neat, p.allergies, p.intolerances,
             p.budget, p.somatotype, p.goal
      FROM users u
      LEFT JOIN user_profiles p ON p.user_id = u.id
      WHERE u.id = $1
    `, [req.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      profile: {
        age: user.age,
        gender: user.gender,
        height_cm: user.height_cm,
        weight_kg: user.weight_kg,
        tmb: user.tmb,
        neat: user.neat,
        allergies: user.allergies || [],
        intolerances: user.intolerances || [],
        budget: user.budget,
        somatotype: user.somatotype,
        goal: user.goal
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /api/users/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const {
      age, gender, height_cm, weight_kg,
      neat, allergies, intolerances, budget, goal
    } = req.body;

    // Calcular TMB (Mifflin-St Jeor)
    let tmb = null;
    if (age && gender && height_cm && weight_kg) {
      if (gender === 'male') {
        tmb = Math.round(10 * weight_kg + 6.25 * height_cm - 5 * age + 5);
      } else if (gender === 'female') {
        tmb = Math.round(10 * weight_kg + 6.25 * height_cm - 5 * age - 161);
      }
    }

    // Actualizar perfil
    await pool.query(`
      UPDATE user_profiles
      SET age = COALESCE($1, age),
          gender = COALESCE($2, gender),
          height_cm = COALESCE($3, height_cm),
          weight_kg = COALESCE($4, weight_kg),
          tmb = COALESCE($5, tmb),
          neat = COALESCE($6, neat),
          allergies = COALESCE($7, allergies),
          intolerances = COALESCE($8, intolerances),
          budget = COALESCE($9, budget),
          goal = COALESCE($10, goal),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $11
    `, [
      age, gender, height_cm, weight_kg, tmb, neat,
      allergies, intolerances, budget, goal,
      req.userId
    ]);

    // Obtener perfil actualizado
    const result = await pool.query(`
      SELECT * FROM user_profiles WHERE user_id = $1
    `, [req.userId]);

    res.json({ profile: result.rows[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
