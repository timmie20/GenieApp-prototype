import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
const SuccessCheck = () => {
  return (
    <>
      <motion.div
        initial={{ y: 10, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "backInOut" }}
      >
        <FaCheck size={24} color="white" />
      </motion.div>
    </>
  );
};

export default SuccessCheck;
