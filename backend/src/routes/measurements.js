import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import pool from '../db/db.js';

const router = express.Router();

// POST /api/measurements
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      date, weight_kg, neck_cm, chest_cm, waist_cm,
      hip_cm, arm_cm, thigh_cm, body_fat_estimate, photos, notes
    } = req.body;

    const result = await pool.query(`
      INSERT INTO body_measurements (
        user_id, date, weight_kg, neck_cm, chest_cm,
        waist_cm, hip_cm, arm_cm, thigh_cm,
        body_fat_estimate, photos, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      req.userId,
      date || new Date().toISOString().split('T')[0],
      weight_kg, neck_cm, chest_cm, waist_cm, hip_cm,
      arm_cm, thigh_cm, body_fat_estimate,
      photos ? JSON.stringify(photos) : null,
      notes
    ]);

    res.status(201).json({ measurement: result.rows[0] });
  } catch (error) {
    console.error('Create measurement error:', error);
    res.status(500).json({ error: 'Failed to save measurement' });
  }
});

// GET /api/measurements
router.get('/', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await pool.query(`
      SELECT *
      FROM body_measurements
      WHERE user_id = $1
      ORDER BY date DESC, created_at DESC
      LIMIT $2
    `, [req.userId, limit]);

    res.json({ measurements: result.rows });
  } catch (error) {
    console.error('Get measurements error:', error);
    res.status(500).json({ error: 'Failed to fetch measurements' });
  }
});

// GET /api/measurements/latest
router.get('/latest', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM body_measurements
      WHERE user_id = $1
      ORDER BY date DESC, created_at DESC
      LIMIT 1
    `, [req.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No measurements found' });
    }

    res.json({ measurement: result.rows[0] });
  } catch (error) {
    console.error('Get latest measurement error:', error);
    res.status(500).json({ error: 'Failed to fetch latest measurement' });
  }
});

export default router;
