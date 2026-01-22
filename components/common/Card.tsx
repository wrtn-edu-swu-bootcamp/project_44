/**
 * Card 컴포넌트
 * 참고: docs/design-guide.md (5.3 카드 섹션)
 */

import React from 'react'
import type { RoomStatus } from '@/types'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'room'
  roomStatus?: RoomStatus
}

export function Card({
  children,
  variant = 'default',
  roomStatus,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-lg shadow-sm border transition-shadow'
  
  const variantStyles = {
    default: 'bg-background-card border-border hover:shadow-md',
    room: getRoomCardStyles(roomStatus),
  }
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()
  
  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

function getRoomCardStyles(status?: RoomStatus): string {
  switch (status) {
    case 'empty':
      return 'bg-empty-room border-2 border-empty-room-dark hover:bg-empty-room-bright hover:shadow-md'
    case 'occupied':
      return 'bg-occupied-light border-2 border-occupied'
    case 'upcoming':
      return 'bg-upcoming-light border-2 border-upcoming'
    default:
      return 'bg-background-card border-border hover:shadow-md'
  }
}
