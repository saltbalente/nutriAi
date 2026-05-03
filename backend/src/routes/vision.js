import express from 'express';

const router = express.Router();

// TODO: Implementar Computer Vision
router.post('/analyze-body', async (req, res) => {
  // Endpoint principal: analiza foto con GPT-4 Vision
  // Input: imagen base64 o URL
  // Output: % grasa estimado, somatotipo, confianza
  res.status(501).json({ error: 'Not implemented yet' });
});

router.get('/analyses', async (req, res) => {
  // Historial de análisis del usuario
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
