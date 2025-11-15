import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';
import { database } from 'src/environments/environment.prod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, email, name } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const client = new Client({ connectionString: database.url });

  try {
    await client.connect();

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
    return res.status(500).json({ error: 'Database error' });
  } finally {
    await client.end();
  }
}
