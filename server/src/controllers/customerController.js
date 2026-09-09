import { query } from '../config/db.js';

export async function listCustomers(req, res) {
  try {
    const { search = '', status = 'All' } = req.query;
    const params = [];
    let sql = 'SELECT * FROM customers WHERE 1=1';

    if (search) {
      sql += ' AND (name LIKE ? OR email LIKE ? OR company LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (status !== 'All') {
      sql += ' AND status = ?';
      params.push(status);
    }
    sql += ' ORDER BY id DESC';
    res.json(await query(sql, params));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getCustomer(req, res) {
  try {
    const rows = await query('SELECT * FROM customers WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Customer not found' });
    const transactions = await query(`
      SELECT t.id,t.amount,t.status,t.payment_method,t.transaction_date,o.name offering
      FROM transactions t JOIN offerings o ON o.id=t.offering_id
      WHERE t.customer_id=? ORDER BY t.transaction_date DESC
    `, [req.params.id]);
    res.json({ customer: rows[0], transactions });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
