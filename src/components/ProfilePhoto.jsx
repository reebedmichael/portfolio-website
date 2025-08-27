import { motion } from 'framer-motion'

export default function ProfilePhoto({ 
  photoUrl, 
  name = 'Michael de Beer', 
  size = 'md', 
  className = '',
  showBorder = true,
  showHover = true 
}) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-28 h-28 md:w-32 md:h-32',
    xl: 'w-32 h-32 md:w-40 md:h-40'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl'
  }

  const borderClasses = showBorder 
    ? 'border-4 border-white dark:border-gray-800' 
    : ''

  const hoverProps = showHover 
    ? { whileHover: { scale: 1.05 }, transition: { duration: 0.3 } }
    : {}

  if (photoUrl) {
    return (
      <motion.img
        src={photoUrl}
        alt={`${name} profile photo`}
        className={`${sizeClasses[size]} rounded-full object-cover ${borderClasses} shadow-lg backdrop-blur-sm ${className}`}
        {...hoverProps}
      />
    )
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg ${borderClasses} ${className}`}
      {...hoverProps}
    >
      <span className={textSizes[size]}>
        {name.charAt(0).toUpperCase()}
      </span>
    </motion.div>
  )
}
