import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';
import { database } from 'src/environments/environment.prod';

const client = new Client({
  connectionString: database.url,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { userId, email, name } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    await client.connect();

    // Check if user exists
    const result = await client.query(
      'SELECT * FROM users WHERE auth0_id = $1',
      [userId]
    );

    let user;
    if (result.rows.length > 0) {
      user = result.rows[0]; // existing user
    } else {
      // create new user
      const insertResult = await client.query(
        'INSERT INTO users (auth0_id, email, name) VALUES ($1, $2, $3) RETURNING *',
        [userId, email, name]
      );
      user = insertResult.rows[0];
    }

    await client.end();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    await client.end();
    res.status(500).json({ error: 'Database error' });
  }
}
