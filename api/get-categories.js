const { createClient } = require('./_db.js'); // CommonJS require

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const client = createClient();

  try {
    await client.connect();

    // Get all categories
    const result = await client.query(
      'SELECT * FROM categories ORDER BY id ASC'
    );

    await client.end();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
