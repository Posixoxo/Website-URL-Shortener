import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Shortener = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const savedLinks = localStorage.getItem('shortened-links');
    if (savedLinks) setLinks(JSON.parse(savedLinks));
  }, []);

  useEffect(() => {
    localStorage.setItem('shortened-links', JSON.stringify(links));
  }, [links]);

  const handleShorten = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) { setError(true); return; }

    setError(false);
    setLoading(true);

    try {
      // Logic: If on localhost, use the API directly. If on Vercel, use our proxy.
      const isLocal = window.location.hostname === 'localhost';
      const fetchUrl = isLocal 
        ? `https://is.gd/create.php?format=json&url=${encodeURIComponent(url.trim())}`
        : `/api/shorten?url=${encodeURIComponent(url.trim())}`;

      const response = await fetch(fetchUrl);
      
      // If we are on Vercel and it returned the raw code (the error you saw), 
      // it means the /api folder isn't in the right place or Vercel hasn't built it yet.
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API returned non-JSON. This usually means the /api function isn't running.");
      }

      const data = await response.json();
      
      if (data.shorturl) {
        setLinks([{ id: Date.now(), original: url.trim(), short: data.shorturl }, ...links]);
        setUrl(''); 
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Shortening failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <div className="input-btn">
        <input 
          type="text" 
          placeholder="Shorten a link here..." 
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleShorten(e)}
          style={error ? { border: "3px solid hsl(0, 87%, 67%)" } : {}}
        />
        {error && <p className="error-msg">Please add a valid link</p>}
        <button className="btn1" onClick={handleShorten} disabled={loading}>
          {loading ? "..." : "Shorten It!"}
        </button>
      </div>

      <div className="links-container">
        <AnimatePresence>
          {links.map((link, index) => (
            <motion.div className="links" key={link.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="intended-links">{link.original}</p>
              <div className="right-side-link">
                <a href={link.short} target="_blank" rel="noreferrer" className="shortened-link">{link.short}</a>
                <button className="copy-btn" onClick={() => copyToClipboard(link.short, index)}>
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Shortener;