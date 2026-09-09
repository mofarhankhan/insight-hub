import { query } from '../config/db.js';

export async function dashboard(req, res) {
  try {
    const [[summary]] = await Promise.all([
      query(`
        SELECT
          COALESCE(SUM(CASE WHEN status='Completed' THEN amount ELSE 0 END),0) revenue,
          COUNT(DISTINCT customer_id) customers,
          COUNT(CASE WHEN status='Completed' THEN 1 END) completed_transactions,
          ROUND(
            COUNT(CASE WHEN status='Completed' THEN 1 END) / NULLIF(COUNT(*),0) * 100, 1
          ) conversion_rate
        FROM transactions
      `)
    ]);

    const revenue = await query(`
      SELECT DATE_FORMAT(transaction_date,'%b') month,
             ROUND(SUM(CASE WHEN status='Completed' THEN amount ELSE 0 END),0) value
      FROM transactions
      GROUP BY MONTH(transaction_date), DATE_FORMAT(transaction_date,'%b')
      ORDER BY MONTH(transaction_date)
    `);

    const channels = await query(`
      SELECT payment_method name, COUNT(*) value
      FROM transactions GROUP BY payment_method ORDER BY value DESC
    `);

    const recent = await query(`
      SELECT t.id, c.name customer, o.name offering, t.amount, t.status, t.transaction_date
      FROM transactions t
      JOIN customers c ON c.id=t.customer_id
      JOIN offerings o ON o.id=t.offering_id
      ORDER BY t.transaction_date DESC, t.id DESC LIMIT 7
    `);

    const activity = await query(`
      SELECT id,type,title,description,created_at
      FROM activity_logs ORDER BY created_at DESC,id DESC LIMIT 8
    `);

    res.json({ summary, revenue, channels, recent, activity });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function overview(req, res) {
  try {
    const offerings = await query(`
      SELECT name, category, units, revenue, growth, status
      FROM offerings ORDER BY revenue DESC
    `);
    const customers = await query(`
      SELECT segment, COUNT(*) count, ROUND(AVG(lifetime_value),0) avg_value
      FROM customers GROUP BY segment ORDER BY count DESC
    `);
    res.json({ offerings, customers });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
