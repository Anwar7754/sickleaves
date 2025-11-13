const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple verify endpoint - in real app connect DB or service
app.post('/api/verify', (req, res) => {
  const { reportId } = req.body;
  // Demo logic: if reportId present return verified
  if (reportId && reportId.trim().length > 0) {
    return res.json({ ok: true, message: 'Report verified', reportId });
  }
  return res.status(400).json({ ok: false, message: 'Missing reportId' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));