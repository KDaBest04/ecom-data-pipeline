import { Pool } from 'pg';

const pool = new Pool({
  user: 'admin',
  password: 'password123',
  host: 'localhost',
  port: 5432,
  database: 'ecom_db',
});

export default pool;