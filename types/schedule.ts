/**
 * 시간표 관련 타입 정의
 * 참고: docs/기획안.md (5. 시간대 구분 섹션)
 */

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0: 일요일, 1: 월요일, ..., 6: 토요일

export interface TimeSlot {
  period: number // 1교시, 2교시, ...
  startTime: string // "09:00"
  endTime: string // "10:00"
}

export interface ClassSchedule {
  id: string
  roomId: string
  dayOfWeek: DayOfWeek
  period: number // 1-10교시
  startTime: string // "09:00"
  endTime: string // "10:00"
  className: string // 수업명
  instructor?: string // 교수명
  semester?: string // 학기 정보
}

export interface DailySchedule {
  date: string // ISO 8601 날짜
  dayOfWeek: DayOfWeek
  slots: ScheduleSlot[]
}

export interface ScheduleSlot {
  id: string
  roomId: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  className?: string
  isOccupied: boolean
}

export interface WeeklySchedule {
  roomId: string
  monday: ScheduleSlot[]
  tuesday: ScheduleSlot[]
  wednesday: ScheduleSlot[]
  thursday: ScheduleSlot[]
  friday: ScheduleSlot[]
}

// 시간표 상수
export const TIME_SLOTS: TimeSlot[] = [
  { period: 1, startTime: '09:00', endTime: '10:00' },
  { period: 2, startTime: '10:00', endTime: '11:00' },
  { period: 3, startTime: '11:00', endTime: '12:00' },
  { period: 4, startTime: '12:00', endTime: '13:00' },
  { period: 5, startTime: '13:00', endTime: '14:00' },
  { period: 6, startTime: '14:00', endTime: '15:00' },
  { period: 7, startTime: '15:00', endTime: '16:00' },
  { period: 8, startTime: '16:00', endTime: '17:00' },
  { period: 9, startTime: '17:00', endTime: '18:00' },
  { period: 10, startTime: '18:00', endTime: '19:00' },
]

export const BUFFER_TIME_MINUTES = 10 // 수업 간 버퍼 타임 (분)
