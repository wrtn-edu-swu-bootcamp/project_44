/**
 * Header 컴포넌트
 * 참고: docs/wireframe.md (1. 메인/홈 화면 - 헤더 섹션)
 * 참고: docs/design-guide.md (4. 레이아웃 스타일, 5.4 네비게이션 섹션)
 */

import Link from 'next/link'
import { Button } from '../common/Button'

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between">
      <Link href="/" className="text-h4 text-burgundy font-bold">
        빈 강의실 정보 시스템
      </Link>
      
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/rooms/current" className="text-body text-text-primary hover:text-burgundy">
          실시간 강의실 사용
        </Link>
        <Link href="/rooms/timerange" className="text-body text-text-primary hover:text-burgundy">
          특정 시간대 조회
        </Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="secondary" size="sm">로그인</Button>
        </Link>
      </div>
    </header>
  )
}
