import React from 'react';
import './App.css';
import { motion } from 'framer-motion'; 
import Navbar from './components/Navbar';
import Shortener from './components/Shortener';

function App() {
  // Logic for the card entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Logic for the connecting lines on mobile
  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="container">
      <Navbar />

      <section>
        <div className="mobile-version">
          <img src="images/illustration-working.svg" alt="icon-illustrator" className="illustrator" />
        </div>

        <div className="flex">
          <div className="more">
            <h1>More than just shorter links</h1>
            <p>Build your brand’s recognition and get detailed insights on how your links are performing.</p>
            <button className="btn">Get Started</button>
          </div>

          <div className="flex1 desktop-version">
            <img src="images/illustration-working.svg" alt="icon-illustrator" className="illustrator" />
          </div>
        </div>
      </section>

      <section className="bg">
        <Shortener />

        <div className="stats">
          <h2>Advanced Statistics</h2>
          <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
        </div>

        <div className="desktop-grid">
          {/* Card 1 */}
          <motion.div 
            className="description"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img src="images/icon-brand-recognition.svg" alt="recog" className="master-c" />
            <h3>Brand Recognition</h3>
            <p>Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.</p>
          </motion.div>

          {/* Animated Connecting Line 1 (Mobile) */}
          <div className="flex">
            <motion.div 
              className="line mobile-version"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ originY: 0 }}
            ></motion.div>
          </div>

          {/* Card 2 */}
          <motion.div 
            className="description pad1"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img src="images/icon-detailed-records.svg" alt="record" className="master-c" />
            <h3>Detailed Records</h3>
            <p>Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.</p>
          </motion.div>

          {/* Animated Connecting Line 2 (Mobile) */}
          <div className="flex">
            <motion.div 
              className="line mobile-version"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ originY: 0 }}
            ></motion.div>
          </div>

          {/* Card 3 */}
          <motion.div 
            className="description pad2"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img src="images/icon-fully-customizable.svg" alt="customize" className="master-c" />
            <h3>Fully Customizable</h3>
            <p>Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.</p>
          </motion.div>
        </div>

        <div className="bg2">
          <h2>Boost your links today</h2>
          <button className="btn2">Get Started</button>
        </div>

        <footer>
          <div className="loogo"><img src="images/logo.svg" alt="logo" className="logo2" /></div>
          <div className="foot">
            <h4>Features</h4>
            <a href="#">Link Shortening</a>
            <a href="#">Branded Links</a>
            <a href="#">Analytics</a>
          </div>
          <div className="foot">
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">Developers</a>
            <a href="#">Support</a>
          </div>
          <div className="foot pad3">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Our Team</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="foot-img">
            <img src="images/icon-facebook.svg" alt="facebook" className="foot-x" />
            <img src="images/icon-twitter.svg" alt="twitter" className="foot-x" />
            <img src="images/icon-pinterest.svg" alt="pinterest" className="foot-x" />
            <img src="images/icon-instagram.svg" alt="instagram" className="foot-x" />
          </div>
        </footer>
      </section>
    </div>
  );
}

export default App;