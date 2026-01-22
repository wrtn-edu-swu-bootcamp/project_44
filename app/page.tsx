import Link from 'next/link'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'

export default function Home() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-h1 text-text-primary text-center mb-4">
          서울여자대학교
          <br />
          빈 강의실 정보 시스템
        </h1>
        <p className="text-body-large text-text-secondary text-center mb-12">
          실시간으로 빈 강의실을 확인하여
          <br />
          자습 공간을 쉽게 찾아보세요
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-8">
            <h2 className="text-h3 text-text-primary mb-4">실시간 강의실 사용</h2>
            <p className="text-body text-text-secondary mb-6">
              현재 시간 기준 모든 강의실 사용 현황
            </p>
            <Link href="/rooms/current">
              <Button className="w-full">지금 확인하기</Button>
            </Link>
          </Card>
          <Card className="p-8">
            <h2 className="text-h3 text-text-primary mb-4">특정 시간대 조회</h2>
            <p className="text-body text-text-secondary mb-6">
              원하는 시간대의 강의실 사용 현황 확인
            </p>
            <Link href="/rooms/timerange">
              <Button className="w-full">시간 선택하기</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
