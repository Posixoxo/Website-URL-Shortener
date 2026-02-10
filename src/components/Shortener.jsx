import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Shortener = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem('shortened-links')) || [];
    setLinks(savedLinks);
  }, []);

  useEffect(() => {
    localStorage.setItem('shortened-links', JSON.stringify(links));
  }, [links]);

  const handleShorten = async () => {
    if (!url) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);

    try {
      const proxy = "https://corsproxy.io/?";
      const apiUrl = "https://cleanuri.com/api/v1/shorten";
      const response = await fetch(proxy + apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `url=${encodeURIComponent(url)}`
      });
      const data = await response.json();
      if (data.result_url) {
        // Adding a unique ID ensures the animation triggers correctly
        const newLink = { 
          id: Date.now(), 
          original: url, 
          short: data.result_url 
        };
        setLinks([newLink, ...links]);
        setUrl('');
      }
    } catch (err) {
      console.error("Shortening failed:", err);
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
          style={error ? { border: "3px solid hsl(0, 87%, 67%)" } : {}}
        />
        {error && <p className="error-msg">Please add a link</p>}
        <button className="btn1" onClick={handleShorten} disabled={loading}>
          {loading ? "..." : "Shorten It!"}
        </button>
      </div>

      <div className="links-container">
        {/* AnimatePresence must wrap the map function */}
        <AnimatePresence initial={false}>
          {links.map((link, index) => (
            <motion.div 
              className="links" 
              key={link.id || index} // Unique key is vital for animation
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              style={{ display: 'flex', overflow: 'hidden' }}
            >
              <p className="intended-links">{link.original}</p>
              <div className="link-border mobile-version"></div>
              <a href={link.short} target="_blank" rel="noreferrer" className="shortened-link">
                {link.short}
              </a>
              <button 
                className="copy-btn" 
                onClick={() => copyToClipboard(link.short, index)}
                style={copiedIndex === index ? { backgroundColor: "hsl(260, 8%, 14%)" } : {}}
              >
                {copiedIndex === index ? "Copied!" : "Copy"}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Shortener;