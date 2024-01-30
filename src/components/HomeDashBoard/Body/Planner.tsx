"use client";
import { motion } from "framer-motion";

const Planner = () => {
  const flipAnimation = {
    hidden: { opacity: 0, rotateY: 180 },
    visible: { opacity: 1, rotateY: 0 },
    whileTap: "visible",
  };

  return (
    <div className="mt-[300px]  p-0 mb-0 text-center  transform -translate-y-1/2">
      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.5 }}
        variants={flipAnimation}
        transition={{ duration: 1 }}
        className="text-6xl font-yourFont"
      >
        <h1 className="text-[200px] font-mono">THE PLANNER</h1>
      </motion.div>
    </div>
  );
};

export default Planner;
