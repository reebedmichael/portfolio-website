import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({
  threshold = 300,
  position = "bottom-right",
  color = "from-blue-500 to-purple-500",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Position classes
  const posClass =
    position === "bottom-right"
      ? "right-4 bottom-4"
      : position === "bottom-left"
      ? "left-4 bottom-4"
      : "";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          aria-label="Scroll to top"
          className={`fixed z-50 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center shadow-lg text-white bg-gradient-to-br ${color} ${posClass} focus:outline-none hover:scale-105 active:scale-95 transition-transform`}
        >
          <ArrowUp className="w-6 h-6" />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 