import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation for the hamburger lines
  const lineVariants = {
    top: {
      closed: { rotate: 0, y: 0 },
      opened: { rotate: 45, y: 8 }
    },
    middle: {
      closed: { opacity: 1 },
      opened: { opacity: 0 }
    },
    bottom: {
      closed: { rotate: 0, y: 0 },
      opened: { rotate: -45, y: -8 }
    }
  };

  return (
    <header>
      <nav className="navbar">
        <img src="images/logo.svg" alt="icon-logo" className="logo" />
        
        {/* New Animated Hamburger instead of <img> */}
        <div className="hamburger-container mobile-version" onClick={() => setIsOpen(!isOpen)}>
          <motion.span 
            variants={lineVariants.top} 
            animate={isOpen ? "opened" : "closed"} 
            transition={{ duration: 0.6 }}
          />
          <motion.span 
            variants={lineVariants.middle} 
            animate={isOpen ? "opened" : "closed"} 
            transition={{ duration: 0.6 }}
          />
          <motion.span 
            variants={lineVariants.bottom} 
            animate={isOpen ? "opened" : "closed"} 
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="nav2">
          <a href="#" className="desktop-version">Features</a>
          <a href="#" className="desktop-version">Pricing</a>
          <a href="#" className="desktop-version">Resources</a>
          <div className="right">
            <a href="#" className="desktop-version">Login</a>
            <a href="#" className="sign-up-btn2 desktop-version">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown with smooth slide & fade */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="dropdown-menu open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="menu">
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Resources</a>
              <div className="border-bottom"></div>
              <a href="#">Login</a>
              <a href="#" className="sign-up-btn">Sign Up</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;