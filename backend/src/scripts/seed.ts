/**
 * 가상 데이터 시드 스크립트
 * 참고: docs/기획안.md (6. 가상 데이터 구조 섹션, 부록: 가상 데이터 상세 예시)
 */

import pool from '../db/connection.js'
import { initDatabase } from '../db/init.js'

interface Building {
  name: string
  englishName: string
}

interface Room {
  buildingName: string
  roomNumber: string
  floor: number
  capacity: number
}

interface Schedule {
  roomNumber: string
  buildingName: string
  dayOfWeek: number
  period: number
  className?: string
}

const buildings: Building[] = [
  { name: '제1과학관', englishName: 'Science Building 1' },
  { name: '인문사회관', englishName: 'Humanities and Social Sciences Building' },
  { name: '제2과학관', englishName: 'Science Building 2' },
]

// 각 건물당 1~5층, 각 층 28개 강의실 생성
const generateRooms = (): Room[] => {
  const rooms: Room[] = []
  const buildingNames = ['제1과학관', '인문사회관', '제2과학관']
  
  for (const buildingName of buildingNames) {
    for (let floor = 1; floor <= 5; floor++) {
      for (let roomNum = 1; roomNum <= 28; roomNum++) {
        const roomNumber = `${floor}${String(roomNum).padStart(2, '0')}`
        // 수용 인원을 30~80 사이 랜덤으로 설정
        const capacity = Math.floor(Math.random() * 51) + 30 // 30~80
        rooms.push({
          buildingName,
          roomNumber,
          floor,
          capacity,
        })
      }
    }
  }
  
  return rooms
}

const rooms: Room[] = generateRooms()

// 가상 강의명 목록
const classNames = [
  '영어회화', '컴퓨터프로그래밍', '미적분학', '선형대수학', '통계학',
  '한국사', '세계사', '경제학원론', '경영학개론', '마케팅',
  '심리학개론', '사회학개론', '철학개론', '문학의이해', '예술의이해',
  '생물학', '화학', '물리학', '지구과학', '환경과학',
  '데이터베이스', '알고리즘', '인공지능', '소프트웨어공학', '네트워크',
  '회계학', '재무관리', '인사관리', '생산관리', '국제경영',
  '교육학개론', '교육심리학', '교육과정', '교육평가', '교육사회학'
]

// 랜덤 시간표 생성 함수
const generateRandomSchedules = (rooms: Room[]): Schedule[] => {
  const schedules: Schedule[] = []
  
  // 각 강의실마다 랜덤하게 시간표 배정
  for (const room of rooms) {
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
            
            const randomClassName = classNames[Math.floor(Math.random() * classNames.length)]
            
            schedules.push({
              roomNumber: room.roomNumber,
              buildingName: room.buildingName,
              dayOfWeek,
              period,
              className: randomClassName
            })
          }
        }
      }
    }
  }
  
  return schedules
}

const mondaySchedules: Schedule[] = generateRandomSchedules(rooms)

async function seed() {
  try {
    console.log('Initializing database...')
    await initDatabase()

    console.log('Seeding buildings...')
    for (const building of buildings) {
      await pool.query(
        'INSERT INTO buildings (name, english_name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING',
        [building.name, building.englishName]
      )
    }

    console.log('Seeding rooms...')
    for (const room of rooms) {
      const buildingResult = await pool.query('SELECT id FROM buildings WHERE name = $1', [
        room.buildingName,
      ])
      if (buildingResult.rows.length === 0) {
        console.warn(`Building not found: ${room.buildingName}`)
        continue
      }
      const buildingId = buildingResult.rows[0].id

      await pool.query(
        `INSERT INTO rooms (building_id, room_number, floor, capacity, facilities, accessibility)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (building_id, room_number) DO NOTHING`,
        [
          buildingId,
          room.roomNumber,
          room.floor,
          room.capacity,
          JSON.stringify([
            { id: 'projector', name: '프로젝터', available: true },
            { id: 'whiteboard', name: '화이트보드', available: true },
            { id: 'computer', name: '컴퓨터', available: true },
          ]),
          JSON.stringify({
            wheelchairAccessible: true,
            elevatorAvailable: true,
            accessibleRestroom: true,
            visualImpairmentSupport: false,
          }),
        ]
      )
    }

    console.log('Seeding schedules...')
    console.log(`Inserting ${mondaySchedules.length} schedule entries...`)
    
    let insertedCount = 0
    for (const schedule of mondaySchedules) {
      const buildingResult = await pool.query('SELECT id FROM buildings WHERE name = $1', [
        schedule.buildingName,
      ])
      if (buildingResult.rows.length === 0) continue
      const buildingId = buildingResult.rows[0].id

      const roomResult = await pool.query(
        'SELECT id FROM rooms WHERE building_id = $1 AND room_number = $2',
        [buildingId, schedule.roomNumber]
      )
      if (roomResult.rows.length === 0) continue
      const roomId = roomResult.rows[0].id

      const startTime = `${String(8 + schedule.period).padStart(2, '0')}:00`
      const endTime = `${String(9 + schedule.period).padStart(2, '0')}:00`

      await pool.query(
        `INSERT INTO schedules (room_id, day_of_week, period, start_time, end_time, class_name)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (room_id, day_of_week, period) DO NOTHING`,
        [roomId, schedule.dayOfWeek, schedule.period, startTime, endTime, schedule.className]
      )
      insertedCount++
      
      // 진행 상황 출력
      if (insertedCount % 100 === 0) {
        console.log(`Inserted ${insertedCount} schedules...`)
      }
    }
    
    console.log(`Total schedules inserted: ${insertedCount}`)

    console.log('Seed completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()
