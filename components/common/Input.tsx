/**
 * Input 컴포넌트
 * 참고: docs/design-guide.md (5.2 입력 필드 섹션)
 */

import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) {
  const inputStyles = `
    h-10 px-3 py-2.5
    bg-white border rounded-md
    text-body text-text-primary
    placeholder:text-gray
    focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy
    ${error ? 'border-occupied focus:ring-occupied' : 'border-border'}
    ${icon ? 'pl-10' : ''}
    ${className}
  `.trim()

  return (
    <div className="w-full">
      {label && (
        <label className="block text-body text-text-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray">
            {icon}
          </div>
        )}
        <input className={inputStyles} {...props} />
      </div>
      {error && (
        <p className="mt-1 text-body-small text-occupied">{error}</p>
      )}
    </div>
  )
}

/**
 * SearchInput 컴포넌트 (검색 전용)
 */
export function SearchInput({
  className = '',
  ...props
}: Omit<InputProps, 'icon'>) {
  return (
    <Input
      icon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      placeholder="강의실 번호 또는 건물명 검색..."
      className={`bg-background focus:bg-white ${className}`}
      {...props}
    />
  )
}
