import  { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Fullstack Developer",
  "Software Engineer",
  "MERN Stack Engineer",
  "AI Agent Developer",
];

const RollingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Automatically switch words every 3 seconds
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-md font-medium text-[var(--foreground)] sm:text-secondary">
      

      {/* Container with a fixed height to prevent content layout shifts */}
      <div
        style={{
          height: "1.5rem", // Adjust based on your text size
          overflow: "hidden",
          position: "relative",
         
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            // Starting state (hidden below)
            initial={{ opacity: 0, y: 20 }}
            // Active state (visible in position)
            animate={{ opacity: 1, y: 0 }}
            // Exit state (slides up and fades out)
            exit={{ opacity: 0, y: -20 }}
            // Transition configuration for smooth spring physics
            transition={{ duration: 0, ease: "easeInOut" }}
            style={{ position: "absolute", color: "gray", display: "block" }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RollingText;
