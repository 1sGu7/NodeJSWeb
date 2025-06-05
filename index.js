const { Pool } = require('pg');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Lấy thông tin kết nối từ biến môi trường
const pool = new Pool({
  connectionString: postgresql://root:TNdT7Ds6p8Tog5tHNOcjYe3Y5ICfr5Up@dpg-d10gd463jp1c738ve1h0-a/test_database_r0so,
  ssl: {
    rejectUnauthorized: false,  // Cấu hình SSL nếu Render yêu cầu
  }
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');  // Lấy thời gian từ DB để kiểm tra kết nối
    res.send(`Database connected at ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Error connecting to database');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
