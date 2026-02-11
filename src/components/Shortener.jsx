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
      try {
        setLinks(JSON.parse(savedLinks));
      } catch (e) {
        console.error('Failed to parse saved links:', e);
        localStorage.removeItem('shortened-links');
      }
    }
  }, []);

  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem('shortened-links', JSON.stringify(links));
    }
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
      console.log('Calling API with URL:', url.trim()); // Debug log
      
      const response = await fetch(`/api/shorten?url=${encodeURIComponent(url.trim())}`);
      
      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error("API returned non-JSON response");
      }

      const data = await response.json();
      console.log('API response:', data); // Debug log
      
      if (data.shorturl) {
        setLinks(prev => [{ id: Date.now(), original: url.trim(), short: data.shorturl }, ...prev]);
        setUrl(''); 
        setError(false);
      } else if (data.error) {
        console.error('API Error:', data.error);
        setError(true);
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
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <>
      <div className="input-btn">
        <input 
          type="text" 
          placeholder="Shorten a link here..." 
          className={error ? "input error-input" : "input"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleShorten(e)}
        />
        {error && <p className="error-msg">Please add a valid link</p>}
        <button className="btn1" onClick={handleShorten} disabled={loading}>
          {loading ? "Shortening..." : "Shorten It!"}
        </button>
      </div>

      <div className="links-container">
        <AnimatePresence>
          {links.map((link, index) => (
            <motion.div 
              className="links" 
              key={link.id} 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="intended-links">{link.original}</p>
              <div className="right-side-link">
                <a href={link.short} target="_blank" rel="noreferrer" className="shortened-link">{link.short}</a>
                <button 
                  className={copiedIndex === index ? "copy-btn copied" : "copy-btn"}
                  onClick={() => copyToClipboard(link.short, index)}
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