import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { generateNutritionPlan, getUserPlans, getPlanById } from '../services/nutritionService.js';

const router = express.Router();

// POST /api/nutrition/generate-plan
router.post('/generate-plan', authMiddleware, async (req, res) => {
  try {
    const { goal, duration_weeks, preferences } = req.body;

    const plan = await generateNutritionPlan(req.userId, {
      goal,
      duration_weeks,
      ...preferences
    });

    res.status(201).json({ plan });
  } catch (error) {
    console.error('Generate plan error:', error);
    res.status(400).json({ error: error.message });
  }
});

// GET /api/nutrition/plans
router.get('/plans', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const plans = await getUserPlans(req.userId, limit);
    res.json({ plans });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

// GET /api/nutrition/plans/:id
router.get('/plans/:id', authMiddleware, async (req, res) => {
  try {
    const plan = await getPlanById(req.userId, req.params.id);
    res.json({ plan });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(404).json({ error: error.message });
  }
});

export default router;
