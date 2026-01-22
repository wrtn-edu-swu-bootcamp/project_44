/**
 * 강의실 상세 정보 화면
 * 참고: docs/wireframe.md (5. 강의실 상세 정보 화면 섹션)
 */

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { getRoomById, getSchedule, type Room } from '@/lib/api'
import Link from 'next/link'

export default function RoomDetailPage() {
  const params = useParams()
  const roomId = params.id as string
  const [room, setRoom] = useState<Room | null>(null)
  const [schedule, setSchedule] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (roomId) {
      loadRoomData()
    }
  }, [roomId])

  const loadRoomData = async () => {
    try {
      setLoading(true)
      const [roomData, scheduleData] = await Promise.all([
        getRoomById(roomId),
        getSchedule(roomId),
      ])
      setRoom(roomData)
      setSchedule(scheduleData)
    } catch (error) {
      console.error('Error loading room data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-body text-text-secondary">로딩 중...</p>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-body text-text-secondary">강의실을 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className={`p-6 rounded-lg mb-6 ${
          room.status === 'empty'
            ? 'bg-empty-room'
            : room.status === 'occupied'
            ? 'bg-occupied-light'
            : 'bg-upcoming-light'
        }`}
      >
        <h1 className="text-h2 text-text-primary font-bold mb-2">
          {room.building} {room.roomNumber}
        </h1>
        <div className="flex items-center gap-2 mb-2">
          <Badge status={room.status} />
          {room.remainingTime && (
            <span className="text-body text-text-primary">
              {room.status === 'empty' ? `다음 수업: ${room.remainingTime} 후` : ''}
              {room.status === 'occupied' && room.currentClassName
                ? `수업 진행 중: ${room.currentClassName}`
                : ''}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-h4 text-text-primary mb-4">기본 정보</h2>
          <div className="space-y-2">
            <p className="text-body text-text-primary">
              • 건물: {room.building}
            </p>
            <p className="text-body text-text-primary">
              • 강의실 번호: {room.roomNumber}
            </p>
            <p className="text-body text-text-primary">• 층수: {room.floor}층</p>
            <p className="text-body text-text-primary">
              • 수용 인원: {room.capacity}명
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-h4 text-text-primary mb-4">시설 정보</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {room.facilities?.map((facility: any) => (
              <div key={facility.id} className="flex items-center gap-2">
                <span className="text-body text-text-primary">✓ {facility.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-h4 text-text-primary mb-4">접근성 정보</h2>
          <div className="space-y-2">
            {room.accessibility?.wheelchairAccessible && (
              <p className="text-body text-text-primary">✓ 휠체어 접근 가능</p>
            )}
            {room.accessibility?.elevatorAvailable && (
              <p className="text-body text-text-primary">✓ 엘리베이터 이용 가능</p>
            )}
            {room.accessibility?.accessibleRestroom && (
              <p className="text-body text-text-primary">✓ 장애인 화장실</p>
            )}
          </div>
        </Card>

        {schedule && (
          <Card className="p-6">
            <h2 className="text-h4 text-text-primary mb-4">
              오늘의 시간표 ({format(new Date(), 'yyyy년 M월 d일')})
            </h2>
            <div className="space-y-2">
              {schedule.schedules?.map((slot: any) => (
                <div
                  key={slot.id}
                  className={`p-3 rounded-md ${
                    slot.isOccupied
                      ? 'bg-occupied-light border-l-4 border-occupied'
                      : 'bg-empty-room'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-body text-text-primary">
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <span className="text-body text-text-primary">
                      {slot.isOccupied ? slot.className : '빈 강의실'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex gap-4">
          <Link href="/map/campus" className="flex-1">
            <Button variant="secondary" className="w-full">
              지도에서 보기
            </Button>
          </Link>
          <Link href={`/map/floorplan/${room.building}`} className="flex-1">
            <Button variant="secondary" className="w-full">
              플로어플랜 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
