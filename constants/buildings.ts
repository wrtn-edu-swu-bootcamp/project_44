/**
 * 건물 정보 상수
 * 참고: docs/기획안.md (6. 가상 데이터 구조 섹션)
 */

export const BUILDINGS = [
  {
    id: 'science1',
    name: '제1과학관',
    englishName: 'Science Building 1',
  },
  {
    id: 'humanities',
    name: '인문사회관',
    englishName: 'Humanities and Social Sciences Building',
  },
  {
    id: 'science2',
    name: '제2과학관',
    englishName: 'Science Building 2',
  },
] as const

export type BuildingId = typeof BUILDINGS[number]['id']
