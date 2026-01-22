/**
 * 색상 상수 정의
 * 참고: docs/design-guide.md (2. 색상 시스템 섹션)
 */

export const COLORS = {
  // Primary Colors (버건디 계열)
  burgundy: {
    DEFAULT: '#8B1538',
    dark: '#6B0F2A',
    light: '#A51B45',
    lighter: '#C42A5A',
  },
  // Status Colors
  emptyRoom: {
    DEFAULT: '#90EE90',
    bright: '#B4FFB4',
    dark: '#7ACC7A',
  },
  occupied: {
    DEFAULT: '#DC2626',
    light: '#F87171',
    dark: '#B91C1C',
  },
  upcoming: {
    DEFAULT: '#FBBF24',
    light: '#FCD34D',
    dark: '#D97706',
  },
  // Neutral Colors
  gray: {
    DEFAULT: '#6B7280',
    light: '#E5E7EB',
    dark: '#374151',
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
  },
  background: {
    DEFAULT: '#F9FAFB',
    card: '#FFFFFF',
  },
  border: '#E5E7EB',
} as const

/**
 * 강의실 상태에 따른 색상 반환
 */
export function getStatusColor(status: 'empty' | 'occupied' | 'upcoming'): string {
  switch (status) {
    case 'empty':
      return COLORS.emptyRoom.DEFAULT
    case 'occupied':
      return COLORS.occupied.DEFAULT
    case 'upcoming':
      return COLORS.upcoming.DEFAULT
    default:
      return COLORS.gray.DEFAULT
  }
}
