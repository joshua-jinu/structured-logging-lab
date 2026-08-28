const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'ordersdb',
  port: process.env.DB_PORT || 5432,
});

const connectDb = async () => {
  logger.info('db.connect.start');
  try {
    await pool.query('SELECT NOW()');
    logger.info('db.connect.success');
  } catch (err) {
    logger.error('db.connect.failed', {
      error: { name: err.name, message: err.message },
    });
    logger.warn('db.connect.retry');
  }
};

const queryDb = async (text, params) => {
  const operation = String(text || '').trim().split(/\s+/)[0].toUpperCase() || 'QUERY';
  logger.info('db.query.start', { operation });

  const res = await pool.query(text, params);

  logger.info('db.query.success', { operation, rowCount: res.rowCount });
  return res;
};

module.exports = { connectDb, queryDb, pool };
