import React from 'react';
import { motion } from 'framer-motion';

const Statistics = () => {
  const cards = [
    {
      id: 1,
      title: "Brand Recognition",
      desc: "Boost your brand recognition with every click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
      icon: "/icon-brand-recognition.svg"
    },
    {
      id: 2,
      title: "Detailed Records",
      desc: "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
      icon: "/icon-detailed-records.svg"
    },
    {
      id: 3,
      title: "Fully Customizable",
      desc: "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
      icon: "/icon-fully-customizable.svg"
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-header">
        <h2>Advanced Statistics</h2>
        <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
      </div>

      <div className="cards-container">
        {/* The Cyan Line */}
        <div className="connecting-line"></div>

        {cards.map((card, index) => (
          <motion.div 
            className={`card card-${index + 1}`} 
            key={card.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="icon-box">
              <img src={card.icon} alt={card.title} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;