import express from 'express';

const router = express.Router();

// TODO: Implementar tracker de medidas
router.post('/', async (req, res) => {
  // Registrar nuevas medidas
  res.status(501).json({ error: 'Not implemented yet' });
});

router.get('/', async (req, res) => {
  // Historial de medidas del usuario
  res.status(501).json({ error: 'Not implemented yet' });
});

router.get('/latest', async (req, res) => {
  // Última medición
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
