/**
 * Button 컴포넌트
 * 참고: docs/design-guide.md (5.1 버튼 섹션)
 */

import React from 'react'
import { getStatusColor } from '@/constants/colors'

export type ButtonVariant = 'primary' | 'secondary' | 'text'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  children,
  asChild,
  ...props
}: ButtonProps & { asChild?: boolean }) {
  const baseStyles = 'font-button rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2'
  
  const variantStyles = {
    primary: disabled
      ? 'bg-gray-light text-gray-dark cursor-not-allowed'
      : 'bg-burgundy text-white hover:bg-burgundy-dark',
    secondary: disabled
      ? 'bg-white text-gray-dark border border-gray-light cursor-not-allowed'
      : 'bg-white text-burgundy border border-burgundy hover:bg-background',
    text: disabled
      ? 'text-gray-dark cursor-not-allowed'
      : 'text-burgundy hover:bg-background hover:underline',
  }
  
  const sizeStyles = {
    sm: 'h-10 px-4 text-body',
    md: 'h-12 px-6 text-button',
    lg: 'h-14 px-8 text-body-large',
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim(),
      disabled,
      ...props,
    } as any)
  }
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()
  
  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
