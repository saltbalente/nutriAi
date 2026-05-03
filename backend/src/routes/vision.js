import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { analyzeBodyComposition, getUserAnalyses } from '../services/visionService.js';

const router = express.Router();

// POST /api/vision/analyze-body
router.post('/analyze-body', authMiddleware, async (req, res) => {
  try {
    const { image, angle } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Validar que sea URL o base64
    let imageUrl = image;
    if (image.startsWith('data:image')) {
      // TODO: Upload base64 a Cloudinary/S3 y obtener URL
      // Por ahora, requerir URL directa
      return res.status(400).json({ 
        error: 'Base64 upload not implemented yet. Please provide image URL.' 
      });
    }

    const analysis = await analyzeBodyComposition(req.userId, imageUrl, angle);
    res.json({ analysis });
  } catch (error) {
    console.error('Analyze body error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/vision/analyses
router.get('/analyses', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const analyses = await getUserAnalyses(req.userId, limit);
    res.json({ analyses });
  } catch (error) {
    console.error('Get analyses error:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

export default router;
