/**
 * 건물 관련 API 라우트
 */

import { Router } from 'express'
import pool from '../db/connection.js'

export const buildingsRouter = Router()

/**
 * GET /api/buildings
 * 건물 목록 조회
 */
buildingsRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, english_name FROM buildings ORDER BY name')
    res.json({
      buildings: result.rows,
      total: result.rows.length,
    })
  } catch (error) {
    console.error('Error fetching buildings:', error)
    res.status(500).json({ error: 'Failed to fetch buildings' })
  }
})
