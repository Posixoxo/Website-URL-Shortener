// /api/shorten.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`is.gd API returned ${response.status}`);
    }

    const data = await response.json();
    
    // is.gd returns {shorturl: "..."} on success or {errorcode: ..., errormessage: "..."} on error
    return res.status(200).json(data);
  } catch (error) {
    console.error('Shortening error:', error);
    return res.status(500).json({ error: 'Failed to shorten URL', details: error.message });
  }
}