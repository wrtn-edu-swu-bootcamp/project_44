/**
 * 강의실 관련 타입 정의
 * 참고: docs/기획안.md (4. 강의실 정보 구조 섹션)
 */

export type RoomStatus = 'empty' | 'occupied' | 'upcoming'

export interface Facility {
  id: string
  name: string
  available: boolean
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean
  elevatorAvailable: boolean
  accessibleRestroom: boolean
  visualImpairmentSupport: boolean
}

export interface Room {
  id: string
  building: string // "본관", "인문관", "자연관"
  roomNumber: string // "101호"
  floor: number // 1, 2, 3
  capacity: number // 수용 인원
  currentOccupancy?: number // 현재 인원 (선택)
  facilities: Facility[] // 시설 정보
  accessibility: AccessibilityInfo // 접근성 정보
  status?: RoomStatus // 실시간 상태 (계산됨)
  nextClassTime?: string // 다음 수업 시작 시간 (ISO 8601)
  currentClassEndTime?: string // 현재 수업 종료 시간 (ISO 8601)
  remainingTime?: string // 남은 여유 시간 (예: "1시간 30분")
}

export interface RoomWithSchedule extends Room {
  schedule?: ScheduleSlot[]
}

export interface ScheduleSlot {
  id: string
  roomId: string
  dayOfWeek: number // 0: 일요일, 1: 월요일, ..., 6: 토요일
  startTime: string // "09:00"
  endTime: string // "10:00"
  className?: string // 수업명 (예: "영어회화 기초")
  isOccupied: boolean // 해당 시간대에 수업이 있는지 여부
}

export interface Building {
  id: string
  name: string // "본관", "인문관", "자연관"
  englishName?: string // "Main Building", "Humanities Building", etc.
  rooms: Room[]
}
