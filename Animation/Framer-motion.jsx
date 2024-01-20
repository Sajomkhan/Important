// https://www.framer.com/motion/introduction/

// npm i framer-motion

//==================== app/services/page.jsx ======================//
'use client'
import { motion, AnimatePresence } from "framer-motion";

const Services = () => {
  return (
    <AnimatePresence>
      <div className="flex flex-wrap gap-16">
        <motion.div className="w-80 h-80 bg-green-300 flex items-center justify-center"
        initial={{ opacity: 0.1, y: 100}}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 0.6 }}
        // drag
        // initial={{ opacity: 0, scale: 0.5 }}
        // whileInView={{ opacity: 1, scale: 1}}
        // whileHover={{ opacity: 1, scale: 1}}
        // animate={{ opacity: 1, x:100, y:100 }}
        // transition={{ duration: 0.6, delay: 2 }}
        >
          Framer Motion
        </motion.div>       
      </div>
    </AnimatePresence>
  );
};

export default Services;
