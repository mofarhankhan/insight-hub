import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';

async function tableExists(name) {
  const [rows] = await pool.query(`SHOW TABLES LIKE '${name}'`);
  return rows.length > 0;
}

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(40) NOT NULL DEFAULT 'admin',
      avatar VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      company VARCHAR(160) NOT NULL,
      status ENUM('Active','Inactive','Lead') DEFAULT 'Active',
      segment VARCHAR(60) NOT NULL,
      lifetime_value DECIMAL(12,2) DEFAULT 0,
      joined_at DATE NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS offerings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      category VARCHAR(80) NOT NULL,
      units INT DEFAULT 0,
      revenue DECIMAL(12,2) DEFAULT 0,
      growth DECIMAL(6,2) DEFAULT 0,
      status ENUM('Growing','Stable','Declining') DEFAULT 'Stable'
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INT PRIMARY KEY AUTO_INCREMENT,
      customer_id INT NOT NULL,
      offering_id INT NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      status ENUM('Completed','Pending','Refunded') DEFAULT 'Completed',
      payment_method VARCHAR(40) NOT NULL,
      transaction_date DATETIME NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id),
      FOREIGN KEY (offering_id) REFERENCES offerings(id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NULL,
      type VARCHAR(50) NOT NULL,
      title VARCHAR(180) NOT NULL,
      description VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  const [users] = await pool.query('SELECT COUNT(*) AS count FROM users');
  if (users[0].count === 0) {
    const hash = await bcrypt.hash('Admin@123', 10);
    await pool.execute(
      'INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?)',
      ['Aarav Mehta', 'admin@insighthub.local', hash, 'admin']
    );
  }

  const [customers] = await pool.query('SELECT COUNT(*) AS count FROM customers');
  if (customers[0].count === 0) {
    const companies = ['Northstar Labs','Vertex Media','BluePeak','Orbit Systems','Cedar Works','Nova Grid','Atlas Group','PixelForge'];
    const segments = ['Enterprise','Growth','SMB','Startup'];
    const statuses = ['Active','Active','Active','Inactive','Lead'];
    for (let i = 1; i <= 25; i++) {
      const name = ['Olivia','Noah','Emma','Liam','Sophia','Ethan','Mia','Lucas','Amelia','Mason'][i % 10] + ' ' + ['Sharma','Kapoor','Singh','Verma','Malhotra'][i % 5];
      await pool.execute(
        'INSERT INTO customers (name,email,company,status,segment,lifetime_value,joined_at) VALUES (?,?,?,?,?,?,?)',
        [name, `customer${i}@example.com`, companies[i % companies.length], statuses[i % statuses.length], segments[i % segments.length], (3500 + i * 725.4).toFixed(2), `2026-${String((i % 9)+1).padStart(2,'0')}-${String((i % 25)+1).padStart(2,'0')}`]
      );
    }
  }

  const [offerings] = await pool.query('SELECT COUNT(*) AS count FROM offerings');
  if (offerings[0].count === 0) {
    const data = [
      ['Analytics Pro','Analytics',184,48200,18.4,'Growing'],
      ['Insights Cloud','Platform',143,39100,12.8,'Growing'],
      ['Data Connect','Integration',117,28600,9.7,'Stable'],
      ['Executive View','Reporting',91,22100,7.1,'Stable'],
      ['Forecast Engine','AI',72,19400,23.6,'Growing'],
      ['Pulse Alerts','Automation',65,12300,4.8,'Stable'],
      ['Survey Intelligence','Research',51,9800,-3.4,'Declining'],
      ['Market Lens','Research',43,7600,2.1,'Stable']
    ];
    for (const row of data) {
      await pool.execute('INSERT INTO offerings (name,category,units,revenue,growth,status) VALUES (?,?,?,?,?,?)', row);
    }
  }

  const [transactions] = await pool.query('SELECT COUNT(*) AS count FROM transactions');
  if (transactions[0].count === 0) {
    for (let i = 1; i <= 80; i++) {
      const customerId = ((i - 1) % 25) + 1;
      const offeringId = ((i - 1) % 8) + 1;
      const amount = 250 + ((i * 137) % 4200);
      const statuses = ['Completed','Completed','Completed','Pending','Refunded'];
      const methods = ['Card','Bank Transfer','UPI','Card','Wallet'];
      const date = `2026-${String(((i - 1) % 9) + 1).padStart(2,'0')}-${String(((i - 1) % 27) + 1).padStart(2,'0')} 12:00:00`;
      await pool.execute(
        'INSERT INTO transactions (customer_id,offering_id,amount,status,payment_method,transaction_date) VALUES (?,?,?,?,?,?)',
        [customerId, offeringId, amount, statuses[i % statuses.length], methods[i % methods.length], date]
      );
    }
  }

  const [activity] = await pool.query('SELECT COUNT(*) AS count FROM activity_logs');
  if (activity[0].count === 0) {
    const items = [
      ['LOGIN','Admin signed in','New dashboard session created'],
      ['REPORT','Monthly report generated','September performance report is ready'],
      ['CUSTOMER','New customer added','A new enterprise account was created'],
      ['PAYMENT','Payment received','Transaction successfully completed'],
      ['ALERT','Growth alert','Forecast Engine exceeded growth threshold'],
      ['SYSTEM','Data sync completed','Analytics data synchronization finished']
    ];
    for (let i = 0; i < 40; i++) {
      const x = items[i % items.length];
      await pool.execute(
        'INSERT INTO activity_logs (user_id,type,title,description) VALUES (?,?,?,?)',
        [1, x[0], x[1], x[2]]
      );
    }
  }
}
