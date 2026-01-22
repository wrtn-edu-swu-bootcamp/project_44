import type { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '서울여자대학교 빈 강의실 현황 실시간 알리미',
  description: '서울여자대학교 재학생을 위한 실시간 빈 강의실 조회 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
