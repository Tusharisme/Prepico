import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        {
          'bg-[var(--prepico-blue)] text-white hover:opacity-90': variant === 'primary',
          'bg-[var(--prepico-bg-light)] text-[var(--prepico-blue)] hover:bg-blue-100': variant === 'secondary',
          'border border-gray-200 bg-white hover:bg-gray-100': variant === 'outline',
          'hover:bg-gray-100': variant === 'ghost',
          'bg-gradient-to-r from-[var(--prepico-gradient-start)] to-[var(--prepico-gradient-end)] text-white hover:opacity-90': variant === 'gradient',
          'h-9 px-4 text-sm': size === 'sm',
          'h-11 px-6 text-base': size === 'md',
          'h-14 px-8 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, cn }
