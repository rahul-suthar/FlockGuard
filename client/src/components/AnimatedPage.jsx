import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
