/**
 * 사용자 관련 타입 정의
 * 참고: docs/기획안.md (7.3 접근 제어 섹션)
 */

export type UserRole = 'student' | 'professor' | 'staff' | 'admin'

export interface User {
  id: string
  studentId?: string // 학번
  email: string
  name: string
  role: UserRole
  department?: string // 학과
  grade?: number // 학년
  createdAt: string // ISO 8601
  lastLoginAt?: string // ISO 8601
}

export interface AuthToken {
  accessToken: string
  refreshToken?: string
  expiresIn: number // 초 단위
}

export interface LoginCredentials {
  studentIdOrEmail: string
  password: string
  rememberMe?: boolean
}

export interface SSOAuthResponse {
  token: string
  user: User
}
