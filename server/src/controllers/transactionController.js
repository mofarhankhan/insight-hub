import { query } from '../config/db.js';

export async function listTransactions(req, res) {
  try {
    const { search = '', status = 'All' } = req.query;
    const params = [];
    let sql = `
      SELECT t.id,c.name customer,o.name offering,t.amount,t.status,
             t.payment_method,t.transaction_date
      FROM transactions t
      JOIN customers c ON c.id=t.customer_id
      JOIN offerings o ON o.id=t.offering_id
      WHERE 1=1
    `;
    if (search) {
      sql += ' AND (c.name LIKE ? OR o.name LIKE ? OR t.payment_method LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (status !== 'All') {
      sql += ' AND t.status=?';
      params.push(status);
    }
    sql += ' ORDER BY t.transaction_date DESC,t.id DESC';
    res.json(await query(sql, params));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
