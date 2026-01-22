/**
 * 시간 기반 강의실 상태 계산 로직
 * 참고: docs/기획안.md (4.2 실시간 상태 정보, 5.3 요일 구분, 7.2 운영 정책 섹션)
 */

import { format, parse, isWithinInterval, addMinutes, differenceInMinutes } from 'date-fns'

export type RoomStatus = 'empty' | 'occupied' | 'upcoming'

const BUFFER_TIME_MINUTES = 10 // 수업 간 버퍼 타임 (분)

interface ScheduleSlot {
  startTime: string // "09:00"
  endTime: string // "10:00"
  className?: string
}

/**
 * 현재 시간을 기준으로 강의실 상태 계산
 * @param schedules 해당 강의실의 오늘 시간표
 * @param currentTime 현재 시간 (Date 객체)
 * @returns 강의실 상태 및 관련 정보
 */
export function calculateRoomStatus(
  schedules: ScheduleSlot[],
  currentTime: Date = new Date()
): {
  status: RoomStatus
  nextClassTime?: Date
  currentClassEndTime?: Date
  remainingTime?: string
  currentClassName?: string
} {
  const currentTimeOnly = format(currentTime, 'HH:mm')
  const currentDateTime = parse(currentTimeOnly, 'HH:mm', currentTime)

  // 현재 시간에 진행 중인 수업 찾기
  const currentClass = schedules.find((schedule) => {
    const start = parse(schedule.startTime, 'HH:mm', currentTime)
    const end = parse(schedule.endTime, 'HH:mm', currentTime)
    return isWithinInterval(currentDateTime, { start, end })
  })

  // 현재 수업이 있으면 "occupied"
  if (currentClass) {
    const endTime = parse(currentClass.endTime, 'HH:mm', currentTime)
    const remainingMinutes = differenceInMinutes(endTime, currentDateTime)
    const remainingTime = formatRemainingTime(remainingMinutes)

    return {
      status: 'occupied',
      currentClassEndTime: endTime,
      remainingTime,
      currentClassName: currentClass.className,
    }
  }

  // 다음 수업 찾기
  const upcomingClasses = schedules
    .filter((schedule) => {
      const start = parse(schedule.startTime, 'HH:mm', currentTime)
      return start > currentDateTime
    })
    .sort((a, b) => {
      const startA = parse(a.startTime, 'HH:mm', currentTime)
      const startB = parse(b.startTime, 'HH:mm', currentTime)
      return startA.getTime() - startB.getTime()
    })

  if (upcomingClasses.length === 0) {
    // 다음 수업이 없으면 "empty"
    return {
      status: 'empty',
    }
  }

  const nextClass = upcomingClasses[0]
  const nextClassStart = parse(nextClass.startTime, 'HH:mm', currentTime)
  const minutesUntilNextClass = differenceInMinutes(nextClassStart, currentDateTime)

  // 10분 이내 수업 시작 예정이면 "upcoming"
  if (minutesUntilNextClass <= BUFFER_TIME_MINUTES) {
    return {
      status: 'upcoming',
      nextClassTime: nextClassStart,
      remainingTime: formatRemainingTime(minutesUntilNextClass),
    }
  }

  // 10분 이상 여유가 있으면 "empty"
  return {
    status: 'empty',
    nextClassTime: nextClassStart,
    remainingTime: formatRemainingTime(minutesUntilNextClass),
  }
}

/**
 * 남은 시간을 "1시간 30분" 형식으로 포맷
 */
function formatRemainingTime(minutes: number): string {
  if (minutes < 0) return '0분'
  if (minutes < 60) return `${minutes}분`
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}시간`
  }
  
  return `${hours}시간 ${remainingMinutes}분`
}

/**
 * 특정 시간대에 강의실이 사용 가능한지 확인
 */
export function isRoomAvailableInTimeRange(
  schedules: ScheduleSlot[],
  startTime: Date,
  endTime: Date
): boolean {
  return !schedules.some((schedule) => {
    const scheduleStart = parse(schedule.startTime, 'HH:mm', startTime)
    const scheduleEnd = parse(schedule.endTime, 'HH:mm', startTime)
    
    // 시간대가 겹치는지 확인
    return (
      (scheduleStart >= startTime && scheduleStart < endTime) ||
      (scheduleEnd > startTime && scheduleEnd <= endTime) ||
      (scheduleStart <= startTime && scheduleEnd >= endTime)
    )
  })
}
