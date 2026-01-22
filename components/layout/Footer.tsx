/**
 * Footer 컴포넌트
 * 참고: docs/wireframe.md (1. 메인/홈 화면 - 푸터 섹션)
 */

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-body text-text-secondary">
            <p className="font-semibold">서울여자대학교</p>
            <p>빈 강의실 현황 실시간 알리미</p>
          </div>
          <div className="text-body-small text-text-secondary text-center md:text-right">
            <p>문의: support@swu.ac.kr</p>
            <p>버전 1.0</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
