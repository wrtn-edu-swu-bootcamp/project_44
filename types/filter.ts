/**
 * 필터 관련 타입 정의
 * 참고: docs/기획안.md (3.3 고급 필터링 및 검색 섹션)
 */

import type { RoomStatus } from './room'

export interface RoomFilter {
  buildings?: string[] // 건물 선택 (예: ["본관", "인문관"])
  floors?: number[] // 층수 선택 (예: [1, 2, 3])
  minCapacity?: number // 최소 수용 인원
  maxCapacity?: number // 최대 수용 인원
  facilities?: string[] // 시설 필터 (예: ["프로젝터", "화이트보드"])
  accessibility?: AccessibilityFilter
  status?: RoomStatus[] // 강의실 상태 필터
  searchQuery?: string // 검색어 (강의실 번호 또는 건물명)
}

export interface AccessibilityFilter {
  wheelchairAccessible?: boolean
  elevatorAvailable?: boolean
  accessibleRestroom?: boolean
  visualImpairmentSupport?: boolean
}

export interface TimeRangeFilter {
  date: string // ISO 8601 날짜
  startTime: string // "14:00"
  endTime: string // "16:00"
}

export interface FilterState {
  roomFilter: RoomFilter
  timeRange?: TimeRangeFilter
}
