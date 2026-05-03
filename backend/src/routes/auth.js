import express from 'express';

const router = express.Router();

// TODO: Implementar autenticación
router.post('/register', async (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

router.post('/login', async (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

router.post('/logout', async (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
