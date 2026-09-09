import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { signToken } from '../utils/jwt.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const rows = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const token = signToken(user);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
