/**
 * 강의실 관련 API 라우트
 * 참고: docs/기획안.md (3. 핵심 기능 섹션)
 */

import { Router } from 'express'
import {
  getRooms,
  getCurrentEmptyRooms,
  getAvailableRoomsInTimeRange,
  getRoomById,
} from '../services/roomService.js'

export const roomsRouter = Router()

/**
 * GET /api/rooms
 * 강의실 목록 조회 (필터 적용 가능)
 */
roomsRouter.get('/', async (req, res) => {
  try {
    const filter = {
      building: req.query.building as string | undefined,
      floor: req.query.floor ? parseInt(req.query.floor as string) : undefined,
      minCapacity: req.query.minCapacity
        ? parseInt(req.query.minCapacity as string)
        : undefined,
      maxCapacity: req.query.maxCapacity
        ? parseInt(req.query.maxCapacity as string)
        : undefined,
      status: req.query.status as 'empty' | 'occupied' | 'upcoming' | undefined,
    }

    const rooms = await getRooms(filter)

    res.json({
      rooms,
      total: rooms.length,
    })
  } catch (error) {
    console.error('Error fetching rooms:', error)
    res.status(500).json({ error: 'Failed to fetch rooms' })
  }
})

/**
 * GET /api/rooms/current
 * 현재 시간 기준 빈 강의실 조회
 */
roomsRouter.get('/current', async (req, res) => {
  try {
    const rooms = await getCurrentEmptyRooms()

    res.json({
      rooms,
      total: rooms.length,
    })
  } catch (error) {
    console.error('Error fetching current empty rooms:', error)
    res.status(500).json({ error: 'Failed to fetch current empty rooms' })
  }
})

/**
 * GET /api/rooms/timerange
 * 특정 시간대 빈 강의실 조회
 * Query params: date (yyyy-MM-dd), startTime (HH:mm), endTime (HH:mm)
 */
roomsRouter.get('/timerange', async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        error: 'Missing required parameters: date, startTime, endTime',
      })
    }

    const rooms = await getAvailableRoomsInTimeRange(
      date as string,
      startTime as string,
      endTime as string
    )

    res.json({
      rooms,
      total: rooms.length,
    })
  } catch (error) {
    console.error('Error fetching rooms in time range:', error)
    res.status(500).json({ error: 'Failed to fetch rooms in time range' })
  }
})

/**
 * GET /api/rooms/:id
 * 특정 강의실 상세 정보
 */
roomsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const room = await getRoomById(id)

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    res.json(room)
  } catch (error) {
    console.error('Error fetching room:', error)
    res.status(500).json({ error: 'Failed to fetch room' })
  }
})
