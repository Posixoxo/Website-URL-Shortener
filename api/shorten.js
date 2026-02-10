// /api/shorten.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    // Send back proper JSON
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}