import { VercelRequest, VercelResponse } from '@vercel/node';
const { Client } = require('pg');

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const client = new Client({
    connectionString: process.env['DATABASE_URL'], // <-- use environment variable
  });

  try {
    await client.connect();

    const { userId, email, name } = req.body;

    const result = await client.query(
      'SELECT * FROM users WHERE auth0_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      const insertResult = await client.query(
        'INSERT INTO users (auth0_id, email, name) VALUES ($1, $2, $3) RETURNING *',
        [userId, email, name]
      );
      return res.status(200).json(insertResult.rows[0]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error', details: err });
  } finally {
    await client.end();
  }
};
