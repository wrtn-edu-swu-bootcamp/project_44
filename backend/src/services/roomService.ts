/**
 * 강의실 관련 비즈니스 로직
 */

import pool from '../db/connection.js'
import { calculateRoomStatus, isRoomAvailableInTimeRange } from '../utils/roomStatus.js'
import { format, parse, getDay } from 'date-fns'

export interface RoomFilter {
  building?: string
  floor?: number
  minCapacity?: number
  maxCapacity?: number
  status?: 'empty' | 'occupied' | 'upcoming'
}

export interface RoomWithStatus {
  id: string
  building: string
  roomNumber: string
  floor: number
  capacity: number
  currentOccupancy?: number
  status: 'empty' | 'occupied' | 'upcoming'
  nextClassTime?: string
  currentClassEndTime?: string
  remainingTime?: string
  currentClassName?: string
  facilities: any[]
  accessibility: any
}

/**
 * 모든 강의실 조회 (필터 적용 가능)
 */
export async function getRooms(filter?: RoomFilter): Promise<RoomWithStatus[]> {
  let query = `
    SELECT 
      r.id,
      b.name as building,
      r.room_number as "roomNumber",
      r.floor,
      r.capacity,
      r.facilities,
      r.accessibility
    FROM rooms r
    JOIN buildings b ON r.building_id = b.id
    WHERE 1=1
  `
  const params: any[] = []
  let paramIndex = 1

  if (filter?.building) {
    query += ` AND b.name = $${paramIndex}`
    params.push(filter.building)
    paramIndex++
  }

  if (filter?.floor !== undefined) {
    query += ` AND r.floor = $${paramIndex}`
    params.push(filter.floor)
    paramIndex++
  }

  if (filter?.minCapacity) {
    query += ` AND r.capacity >= $${paramIndex}`
    params.push(filter.minCapacity)
    paramIndex++
  }

  if (filter?.maxCapacity) {
    query += ` AND r.capacity <= $${paramIndex}`
    params.push(filter.maxCapacity)
    paramIndex++
  }

  const result = await pool.query(query, params)
  const rooms = result.rows

  // 각 강의실의 현재 상태 계산
  const currentTime = new Date()
  const dayOfWeek = getDay(currentTime) // 0: 일요일, 1: 월요일, ...

  const roomsWithStatus: RoomWithStatus[] = await Promise.all(
    rooms.map(async (room) => {
      // 오늘의 시간표 조회
      const scheduleResult = await pool.query(
        `SELECT start_time, end_time, class_name
         FROM schedules
         WHERE room_id = $1 AND day_of_week = $2
         ORDER BY start_time`,
        [room.id, dayOfWeek === 0 ? 7 : dayOfWeek] // 일요일을 7로 변환
      )

      const schedules = scheduleResult.rows.map((row) => ({
        startTime: row.start_time,
        endTime: row.end_time,
        className: row.class_name,
      }))

      const statusInfo = calculateRoomStatus(schedules, currentTime)

      return {
        id: room.id,
        building: room.building,
        roomNumber: room.roomNumber,
        floor: room.floor,
        capacity: room.capacity,
        status: statusInfo.status,
        nextClassTime: statusInfo.nextClassTime?.toISOString(),
        currentClassEndTime: statusInfo.currentClassEndTime?.toISOString(),
        remainingTime: statusInfo.remainingTime,
        currentClassName: statusInfo.currentClassName,
        facilities: room.facilities || [],
        accessibility: room.accessibility || {},
      }
    })
  )

  // 상태 필터 적용
  if (filter?.status) {
    return roomsWithStatus.filter((room) => room.status === filter.status)
  }

  return roomsWithStatus
}

/**
 * 현재 시간 기준 빈 강의실 조회
 */
export async function getCurrentEmptyRooms(): Promise<RoomWithStatus[]> {
  const rooms = await getRooms()
  return rooms.filter((room) => room.status === 'empty')
}

/**
 * 특정 시간대에 사용 가능한 강의실 조회
 */
export async function getAvailableRoomsInTimeRange(
  date: string,
  startTime: string,
  endTime: string
): Promise<RoomWithStatus[]> {
  const targetDate = parse(date, 'yyyy-MM-dd', new Date())
  const dayOfWeek = getDay(targetDate) === 0 ? 7 : getDay(targetDate)

  const startDateTime = parse(`${date} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date())
  const endDateTime = parse(`${date} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date())

  // 모든 강의실 조회
  const allRooms = await pool.query(`
    SELECT 
      r.id,
      b.name as building,
      r.room_number as "roomNumber",
      r.floor,
      r.capacity,
      r.facilities,
      r.accessibility
    FROM rooms r
    JOIN buildings b ON r.building_id = b.id
  `)

  const availableRooms: RoomWithStatus[] = []

  for (const room of allRooms.rows) {
    // 해당 날짜의 시간표 조회
    const scheduleResult = await pool.query(
      `SELECT start_time, end_time, class_name
       FROM schedules
       WHERE room_id = $1 AND day_of_week = $2`,
      [room.id, dayOfWeek]
    )

    const schedules = scheduleResult.rows.map((row) => ({
      startTime: row.start_time,
      endTime: row.end_time,
      className: row.class_name,
    }))

    // 시간대에 사용 가능한지 확인
    if (isRoomAvailableInTimeRange(schedules, startDateTime, endDateTime)) {
      availableRooms.push({
        id: room.id,
        building: room.building,
        roomNumber: room.roomNumber,
        floor: room.floor,
        capacity: room.capacity,
        status: 'empty',
        facilities: room.facilities || [],
        accessibility: room.accessibility || {},
      })
    }
  }

  return availableRooms
}

/**
 * 특정 강의실 상세 정보 조회
 */
export async function getRoomById(id: string): Promise<RoomWithStatus | null> {
  const result = await pool.query(
    `SELECT 
      r.id,
      b.name as building,
      r.room_number as "roomNumber",
      r.floor,
      r.capacity,
      r.facilities,
      r.accessibility
    FROM rooms r
    JOIN buildings b ON r.building_id = b.id
    WHERE r.id = $1`,
    [id]
  )

  if (result.rows.length === 0) {
    return null
  }

  const room = result.rows[0]
  const currentTime = new Date()
  const dayOfWeek = getDay(currentTime) === 0 ? 7 : getDay(currentTime)

  // 오늘의 시간표 조회
  const scheduleResult = await pool.query(
    `SELECT start_time, end_time, class_name
     FROM schedules
     WHERE room_id = $1 AND day_of_week = $2
     ORDER BY start_time`,
    [room.id, dayOfWeek]
  )

  const schedules = scheduleResult.rows.map((row) => ({
    startTime: row.start_time,
    endTime: row.end_time,
    className: row.class_name,
  }))

  const statusInfo = calculateRoomStatus(schedules, currentTime)

  return {
    id: room.id,
    building: room.building,
    roomNumber: room.roomNumber,
    floor: room.floor,
    capacity: room.capacity,
    status: statusInfo.status,
    nextClassTime: statusInfo.nextClassTime?.toISOString(),
    currentClassEndTime: statusInfo.currentClassEndTime?.toISOString(),
    remainingTime: statusInfo.remainingTime,
    currentClassName: statusInfo.currentClassName,
    facilities: room.facilities || [],
    accessibility: room.accessibility || {},
  }
}
