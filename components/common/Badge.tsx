/**
 * Badge 컴포넌트
 * 참고: docs/design-guide.md (5.6 배지 및 라벨 섹션)
 */

import React from 'react'
import type { RoomStatus } from '@/types'

interface BadgeProps {
  status: RoomStatus
  children?: React.ReactNode
  className?: string
}

const statusLabels = {
  empty: '빈 강의실',
  occupied: '수업 진행 중',
  upcoming: '곧 시작',
}

const statusStyles = {
  empty: 'bg-empty-room text-text-primary',
  occupied: 'bg-occupied text-white',
  upcoming: 'bg-upcoming text-text-primary',
}

export function Badge({ status, children, className = '' }: BadgeProps) {
  const label = children || statusLabels[status]
  const styles = `inline-flex items-center px-2 py-1 rounded text-body-small font-medium ${statusStyles[status]} ${className}`.trim()
  
  return <span className={styles}>{label}</span>
}
