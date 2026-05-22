'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

interface MotionButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  classes?: string
  icon?: React.ReactNode
  showIcon?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const MotionButton = ({
  label,
  variant = 'primary',
  classes = '',
  icon,
  showIcon = true,
  onClick,
  type = 'button',
  disabled = false
}: MotionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  if (variant === 'secondary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'bg-transparent group relative h-auto w-auto cursor-pointer rounded-full border border-neutral-300 dark:border-white/20 overflow-hidden outline-none transition-all duration-300',
          disabled && 'opacity-50 cursor-not-allowed',
          classes
        )}
      >
        {/* Background fill layer */}
        <span
          className={`absolute inset-0 transition-all duration-500 ${
            isHovered ? 'bg-primary' : 'bg-neutral-100 dark:bg-neutral-900'
          }`}
        />
        {/* Text layer */}
        <span className="relative z-10 block px-8 py-3.5 text-center text-sm font-medium tracking-tight">
          <span className={`transition-colors duration-300 ${isHovered ? 'text-neutral-900' : 'text-neutral-700 dark:text-white'}`}>
            {label}
          </span>
        </span>
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative h-auto w-auto cursor-pointer rounded-full overflow-hidden outline-none transition-all duration-300',
        disabled && 'opacity-50 cursor-not-allowed',
        classes
      )}
    >
      {/* Background layer */}
      <span
        className={`absolute inset-0 transition-all duration-500 ${
          isHovered ? 'bg-primary scale-100' : 'bg-primary'
        }`}
      />
      {/* Text and icon layer */}
      <span className="relative z-10 flex items-center justify-center gap-2 px-8 py-3.5">
        <span className={`text-sm font-medium tracking-tight transition-colors duration-300 ${isHovered ? 'text-black' : 'text-black'}`}>
          {label}
        </span>
        {showIcon && (
          <span className={`transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            {icon || <ArrowRight className='text-black size-5' />}
          </span>
        )}
      </span>
    </button>
  )
}

export default MotionButton