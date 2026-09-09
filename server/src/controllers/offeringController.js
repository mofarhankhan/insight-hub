import { query } from '../config/db.js';

export async function listOfferings(req, res) {
  try {
    res.json(await query('SELECT * FROM offerings ORDER BY revenue DESC'));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
