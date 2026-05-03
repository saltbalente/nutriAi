import express from 'express';

const router = express.Router();

// TODO: Implementar gestión de usuarios
router.get('/profile', async (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

router.put('/profile', async (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
