import { motion } from "framer-motion";
import PropTypes from "prop-types";
import clsx from "clsx";

const positionClasses = {
  "bottom-right": "right-4 bottom-4",
  "bottom-left": "left-4 bottom-4",
  "top-right": "right-4 top-4",
  "top-left": "left-4 top-4",
};

export default function FloatingActionButton({
  icon: Icon,
  label,
  color = "from-pink-500 to-purple-500",
  position = "bottom-right",
  onClick,
  ...props
}) {
  return (
    <motion.button
      aria-label={label}
      className={clsx(
        "fixed z-50 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center shadow-lg text-white transition-colors duration-200 focus:outline-none",
        `bg-gradient-to-br ${color}`,
        positionClasses[position]
      )}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      <Icon className="w-6 h-6" />
      <span className="sr-only">{label}</span>
    </motion.button>
  );
}

FloatingActionButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  position: PropTypes.oneOf([
    "bottom-right",
    "bottom-left",
    "top-right",
    "top-left",
  ]),
  onClick: PropTypes.func,
}; 