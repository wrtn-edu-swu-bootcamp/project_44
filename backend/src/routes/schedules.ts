/**
 * 시간표 관련 API 라우트
 */

import { Router } from 'express'
import pool from '../db/connection.js'
import { getDay, parse, format } from 'date-fns'

export const schedulesRouter = Router()

/**
 * GET /api/schedules/:roomId
 * 특정 강의실의 시간표 조회
 * Query params: date (yyyy-MM-dd, 선택)
 */
schedulesRouter.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params
    const { date } = req.query

    let dayOfWeek: number
    if (date) {
      const targetDate = parse(date as string, 'yyyy-MM-dd', new Date())
      dayOfWeek = getDay(targetDate) === 0 ? 7 : getDay(targetDate)
    } else {
      // 오늘 날짜 사용
      const today = new Date()
      dayOfWeek = getDay(today) === 0 ? 7 : getDay(today)
    }

    const result = await pool.query(
      `SELECT 
        id,
        day_of_week as "dayOfWeek",
        period,
        start_time as "startTime",
        end_time as "endTime",
        class_name as "className",
        instructor,
        semester
      FROM schedules
      WHERE room_id = $1 AND day_of_week = $2
      ORDER BY start_time`,
      [roomId, dayOfWeek]
    )

    const schedules = result.rows.map((row) => ({
      id: row.id,
      dayOfWeek: row.dayOfWeek,
      period: row.period,
      startTime: row.startTime,
      endTime: row.endTime,
      className: row.className,
      instructor: row.instructor,
      semester: row.semester,
      isOccupied: !!row.className,
    }))

    res.json({
      roomId,
      schedules,
      total: schedules.length,
    })
  } catch (error) {
    console.error('Error fetching schedules:', error)
    res.status(500).json({ error: 'Failed to fetch schedules' })
  }
})
