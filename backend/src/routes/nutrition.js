import express from 'express';

const router = express.Router();

// TODO: Implementar Nutricionista IA
router.post('/generate-plan', async (req, res) => {
  // Endpoint principal: genera plan nutricional con GPT-4
  res.status(501).json({ error: 'Not implemented yet' });
});

router.get('/plans', async (req, res) => {
  // Lista planes del usuario
  res.status(501).json({ error: 'Not implemented yet' });
});

router.get('/plans/:id', async (req, res) => {
  // Detalle de un plan específico
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
