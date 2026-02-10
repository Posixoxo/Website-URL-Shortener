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
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shortened-links', JSON.stringify(links));
  }, [links]);

  const handleShorten = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url.trim())}`);
      const data = await response.json();
      
      if (data.shorturl) {
        const newLink = { 
          id: `link-${Date.now()}`, 
          original: url.trim(), 
          short: data.shorturl 
        };
        
        // Update state
        setLinks((prevLinks) => [newLink, ...prevLinks]);
        setUrl('');
      } else if (data.errormessage) {
        setError(true);
      }
    } catch (err) {
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
        {/* Removed mode="popLayout" to prevent 'invisible' elements */}
        <AnimatePresence>
          {links && links.length > 0 && links.map((link, index) => (
            <motion.div 
              className="links" 
              key={link.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              // Added a fallback style in case CSS is hiding it
              style={{ display: 'flex' }} 
            >
              <p className="intended-links">{link.original}</p>
              <div className="link-border mobile-version"></div>
              <div className="right-side-link">
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
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Shortener;