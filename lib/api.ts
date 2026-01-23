/**
 * API 클라이언트 (Mock Data Version)
 * 프론트엔드에서 직접 가상 데이터 생성
 */

export interface Room {
  id: string
  building: string
  roomNumber: string
  floor: number
  capacity: number
  status: 'empty' | 'occupied' | 'upcoming'
  nextClassTime?: string
  currentClassEndTime?: string
  remainingTime?: string
  currentClassName?: string
  facilities: any[]
  accessibility: any
}

export interface RoomsResponse {
  rooms: Room[]
  total: number
}

interface Schedule {
  roomId: string
  dayOfWeek: number
  period: number
  startTime: string
  endTime: string
  className: string
}

// 건물 정보
const BUILDINGS = [
  { id: 'science1', name: '제1과학관' },
  { id: 'humanities', name: '인문사회관' },
  { id: 'science2', name: '제2과학관' },
]

// 가상 강의명 목록
const CLASS_NAMES = [
  '영어회화', '컴퓨터프로그래밍', '미적분학', '선형대수학', '통계학',
  '한국사', '세계사', '경제학원론', '경영학개론', '마케팅',
  '심리학개론', '사회학개론', '철학개론', '문학의이해', '예술의이해',
  '생물학', '화학', '물리학', '지구과학', '환경과학',
  '데이터베이스', '알고리즘', '인공지능', '소프트웨어공학', '네트워크',
  '회계학', '재무관리', '인사관리', '생산관리', '국제경영',
  '교육학개론', '교육심리학', '교육과정', '교육평가', '교육사회학'
]

// 강의실 생성 함수
function generateRooms(): Room[] {
  const rooms: Room[] = []
  
  BUILDINGS.forEach((building) => {
    for (let floor = 1; floor <= 5; floor++) {
      for (let roomNum = 1; roomNum <= 28; roomNum++) {
        const roomNumber = `${floor}${String(roomNum).padStart(2, '0')}`
        const capacity = Math.floor(Math.random() * 51) + 30 // 30~80
        const roomId = `${building.id}-${roomNumber}`
        
        // 30% 확률로 컴퓨터실 지정 (70%는 일반 강의실)
        const hasComputer = Math.random() < 0.3
        
        rooms.push({
          id: roomId,
          building: building.name,
          roomNumber,
          floor,
          capacity,
          status: 'empty',
          facilities: [
            { id: 'projector', name: '프로젝터', available: true },
            { id: 'whiteboard', name: '화이트보드', available: true },
            { id: 'computer', name: '컴퓨터', available: hasComputer },
          ],
          accessibility: {
            wheelchairAccessible: true,
            elevatorAvailable: true,
            accessibleRestroom: true,
            visualImpairmentSupport: false,
          },
        })
      }
    }
  })
  
  return rooms
}

// 랜덤 시간표 생성 함수
function generateSchedules(rooms: Room[]): Schedule[] {
  const schedules: Schedule[] = []
  
  rooms.forEach((room) => {
    // 각 요일(월~금)에 대해
    for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
      // 50% 확률로 해당 요일에 강의가 있음
      if (Math.random() > 0.5) {
        // 1~3개의 강의 시간 배정
        const numClasses = Math.floor(Math.random() * 3) + 1
        const usedPeriods = new Set<number>()
        
        for (let i = 0; i < numClasses; i++) {
          // 1~12교시 중 랜덤 선택 (09:00~21:00)
          let period = Math.floor(Math.random() * 12) + 1
          
          // 이미 사용된 시간이면 다시 선택
          let attempts = 0
          while (usedPeriods.has(period) && attempts < 10) {
            period = Math.floor(Math.random() * 12) + 1
            attempts++
          }
          
          if (!usedPeriods.has(period)) {
            usedPeriods.add(period)
            
            const startHour = 8 + period
            const startTime = `${String(startHour).padStart(2, '0')}:00`
            const endTime = `${String(startHour + 1).padStart(2, '0')}:00`
            const className = CLASS_NAMES[Math.floor(Math.random() * CLASS_NAMES.length)]
            
            schedules.push({
              roomId: room.id,
              dayOfWeek,
              period,
              startTime,
              endTime,
              className,
            })
          }
        }
      }
    }
  })
  
  return schedules
}

// 데이터 초기화 및 캐싱
let cachedRooms: Room[] | null = null
let cachedSchedules: Schedule[] | null = null

function initializeData(): { rooms: Room[]; schedules: Schedule[] } {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 빈 데이터 반환
    return { rooms: [], schedules: [] }
  }

  const DATA_VERSION = 'v3' // 버전 변경으로 기존 데이터 무효화
  
  // localStorage에서 데이터 확인
  const savedData = localStorage.getItem('mockRoomData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      // 버전이 일치하면 기존 데이터 사용
      if (parsed.version === DATA_VERSION && parsed.rooms && parsed.schedules) {
        cachedRooms = parsed.rooms
        cachedSchedules = parsed.schedules
        return { rooms: parsed.rooms, schedules: parsed.schedules }
      }
    } catch (e) {
      console.error('Failed to parse saved data:', e)
    }
  }
  
  // 새로운 데이터 생성
  const rooms = generateRooms()
  const schedules = generateSchedules(rooms)
  
  cachedRooms = rooms
  cachedSchedules = schedules
  
  // localStorage에 버전과 함께 저장
  localStorage.setItem('mockRoomData', JSON.stringify({ 
    version: DATA_VERSION,
    rooms, 
    schedules 
  }))
  
  return { rooms, schedules }
}

// 현재 시간에 따른 강의실 상태 계산
function calculateRoomStatus(room: Room, schedules: Schedule[], targetDate?: Date): Room {
  const now = targetDate || new Date()
  const dayOfWeek = now.getDay() // 0(일) ~ 6(토)
  
  // 주말이면 모두 비어있음
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { ...room, status: 'empty' }
  }
  
  const currentTime = now.getHours() * 60 + now.getMinutes()
  const roomSchedules = schedules.filter(s => s.roomId === room.id && s.dayOfWeek === dayOfWeek)
  
  // 해당 강의실의 오늘 스케줄을 시간순으로 정렬
  const sortedSchedules = roomSchedules.sort((a, b) => {
    const aTime = parseInt(a.startTime.split(':')[0]) * 60 + parseInt(a.startTime.split(':')[1])
    const bTime = parseInt(b.startTime.split(':')[0]) * 60 + parseInt(b.startTime.split(':')[1])
    return aTime - bTime
  })
  
  for (const schedule of sortedSchedules) {
    const [startHour, startMin] = schedule.startTime.split(':').map(Number)
    const [endHour, endMin] = schedule.endTime.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    
    // 현재 수업 중
    if (currentTime >= startMinutes && currentTime < endMinutes) {
      const remainingMinutes = endMinutes - currentTime
      return {
        ...room,
        status: 'occupied',
        currentClassName: schedule.className,
        currentClassEndTime: schedule.endTime,
        remainingTime: `${remainingMinutes}분`,
      }
    }
    
    // 다음 수업 1시간 이내 (60분 이내) - upcoming 상태
    if (currentTime < startMinutes && startMinutes - currentTime <= 60) {
      const minutesUntilStart = startMinutes - currentTime
      return {
        ...room,
        status: 'upcoming',
        nextClassTime: schedule.startTime,
        remainingTime: `${minutesUntilStart}분`,
      }
    }
    
    // 다음 수업이 있음 (1시간 이상 남음)
    if (currentTime < startMinutes) {
      return {
        ...room,
        status: 'empty',
        nextClassTime: schedule.startTime,
      }
    }
  }
  
  // 오늘 더 이상 수업이 없음
  return { ...room, status: 'empty' }
}

/**
 * 현재 시간 기준 빈 강의실 조회 (모든 강의실 상태 포함)
 */
export async function getCurrentEmptyRooms(): Promise<RoomsResponse> {
  // Mock API 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { rooms, schedules } = initializeData()
  const roomsWithStatus = rooms.map(room => calculateRoomStatus(room, schedules))
  
  // 모든 강의실 반환 (빈 강의실, 수업 중, 곧 시작 모두 포함)
  return {
    rooms: roomsWithStatus,
    total: roomsWithStatus.length,
  }
}

/**
 * 특정 시간대 강의실 조회 (모든 상태 포함)
 */
export async function getRoomsInTimeRange(
  date: string,
  startTime: string,
  endTime: string
): Promise<RoomsResponse> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { rooms, schedules } = initializeData()
  const targetDate = new Date(date)
  const dayOfWeek = targetDate.getDay()
  
  // 주말이면 모든 강의실이 비어있음
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { rooms, total: rooms.length }
  }
  
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)
  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin
  
  // 모든 강의실에 대해 상태 계산
  const roomsWithStatus = rooms.map(room => {
    const roomSchedules = schedules.filter(
      s => s.roomId === room.id && s.dayOfWeek === dayOfWeek
    )
    
    // 해당 시간대에 겹치는 수업 찾기
    const conflictingSchedule = roomSchedules.find(schedule => {
      const [schedStartHour, schedStartMin] = schedule.startTime.split(':').map(Number)
      const [schedEndHour, schedEndMin] = schedule.endTime.split(':').map(Number)
      const schedStartMinutes = schedStartHour * 60 + schedStartMin
      const schedEndMinutes = schedEndHour * 60 + schedEndMin
      
      // 시간 겹침 체크
      return !(endMinutes <= schedStartMinutes || startMinutes >= schedEndMinutes)
    })
    
    if (conflictingSchedule) {
      // 수업이 있는 경우 - occupied
      return {
        ...room,
        status: 'occupied' as const,
        currentClassName: conflictingSchedule.className,
        currentClassEndTime: conflictingSchedule.endTime,
      }
    }
    
    // 선택한 시간대 이후의 다음 수업 찾기
    const nextSchedule = roomSchedules
      .filter(s => {
        const [schedStartHour, schedStartMin] = s.startTime.split(':').map(Number)
        const schedStartMinutes = schedStartHour * 60 + schedStartMin
        return schedStartMinutes >= endMinutes
      })
      .sort((a, b) => {
        const aStart = parseInt(a.startTime.split(':')[0]) * 60 + parseInt(a.startTime.split(':')[1])
        const bStart = parseInt(b.startTime.split(':')[0]) * 60 + parseInt(b.startTime.split(':')[1])
        return aStart - bStart
      })[0]
    
    // 다음 수업이 1시간 이내에 시작하면 upcoming
    if (nextSchedule) {
      const [nextStartHour, nextStartMin] = nextSchedule.startTime.split(':').map(Number)
      const nextStartMinutes = nextStartHour * 60 + nextStartMin
      const minutesUntilStart = nextStartMinutes - endMinutes
      
      if (minutesUntilStart <= 60) {
        return {
          ...room,
          status: 'upcoming' as const,
          nextClassTime: nextSchedule.startTime,
          remainingTime: `${minutesUntilStart}분`,
        }
      }
    }
    
    return {
      ...room,
      status: 'empty' as const,
      nextClassTime: nextSchedule?.startTime,
    }
  })
  
  return {
    rooms: roomsWithStatus,
    total: roomsWithStatus.length,
  }
}

/**
 * 강의실 목록 조회 (필터 적용 가능)
 */
export async function getRooms(filter?: {
  building?: string
  floor?: number
  minCapacity?: number
  maxCapacity?: number
  status?: 'empty' | 'occupied' | 'upcoming'
}): Promise<RoomsResponse> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { rooms, schedules } = initializeData()
  let filteredRooms = rooms.map(room => calculateRoomStatus(room, schedules))
  
  if (filter) {
    if (filter.building) {
      filteredRooms = filteredRooms.filter(r => r.building === filter.building)
    }
    if (filter.floor) {
      filteredRooms = filteredRooms.filter(r => r.floor === filter.floor)
    }
    if (filter.minCapacity) {
      filteredRooms = filteredRooms.filter(r => r.capacity >= filter.minCapacity!)
    }
    if (filter.maxCapacity) {
      filteredRooms = filteredRooms.filter(r => r.capacity <= filter.maxCapacity!)
    }
    if (filter.status) {
      filteredRooms = filteredRooms.filter(r => r.status === filter.status)
    }
  }
  
  return {
    rooms: filteredRooms,
    total: filteredRooms.length,
  }
}

/**
 * 특정 강의실 상세 정보 조회
 */
export async function getRoomById(id: string): Promise<Room> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { rooms, schedules } = initializeData()
  const room = rooms.find(r => r.id === id)
  
  if (!room) {
    throw new Error('Room not found')
  }
  
  return calculateRoomStatus(room, schedules)
}

/**
 * 건물 목록 조회
 */
export async function getBuildings() {
  await new Promise(resolve => setTimeout(resolve, 100))
  return BUILDINGS
}

/**
 * 특정 강의실의 시간표 조회
 */
export async function getSchedule(roomId: string, date?: string) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { schedules } = initializeData()
  const targetDate = date ? new Date(date) : new Date()
  const dayOfWeek = targetDate.getDay()
  
  const roomSchedules = schedules
    .filter(s => s.roomId === roomId && s.dayOfWeek === dayOfWeek)
    .sort((a, b) => {
      const aTime = parseInt(a.startTime.split(':')[0]) * 60 + parseInt(a.startTime.split(':')[1])
      const bTime = parseInt(b.startTime.split(':')[0]) * 60 + parseInt(b.startTime.split(':')[1])
      return aTime - bTime
    })
  
  return {
    schedules: roomSchedules,
    date: targetDate.toISOString().split('T')[0],
  }
}

/**
 * Mock 데이터 초기화 (테스트/개발용)
 */
export function resetMockData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mockRoomData')
    cachedRooms = null
    cachedSchedules = null
  }
}
