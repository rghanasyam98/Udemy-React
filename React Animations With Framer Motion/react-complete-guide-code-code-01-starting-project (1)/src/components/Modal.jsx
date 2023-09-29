import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        open
        className="modal"
        // to avoid duplication we can define common variables
        variants={{
          hidden:{ opacity: 0, y: 30 },
          visible:{ y: 0, opacity: 1 }
        }}
        initial="hidden"
        animate="visible"
        // EXIT animation reflect cheyyan screen il ninnu remove aakkunna component ne <AnimatePresence> kond wrap cheyyanam
        exit="hidden"
        transition={{
          duration:1,
          type:'spring'
        }}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
