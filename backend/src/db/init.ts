import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pool from './connection.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 데이터베이스 초기화 함수
 * schema.sql 파일을 읽어서 실행
 */
export async function initDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    
    // SQL 문을 세미콜론으로 분리하고 실행
    const statements = schema
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0)
    
    for (const statement of statements) {
      await pool.query(statement)
    }
    
    console.log('Database schema initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}
