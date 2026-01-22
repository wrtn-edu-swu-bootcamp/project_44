/**
 * 현재 시간 기준 빈 강의실 조회 화면
 * 참고: docs/wireframe.md (2. 현재 시간 기준 빈 강의실 조회 화면 섹션)
 * 참고: docs/design-guide.md (9.2 현재 시간 기준 빈 강의실 조회 화면 섹션)
 */

'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { SearchInput } from '@/components/common/Input'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { getCurrentEmptyRooms, type Room } from '@/lib/api'

export default function CurrentRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBuilding, setSelectedBuilding] = useState<string>('전체')
  const [selectedFloor, setSelectedFloor] = useState<string>('전체')
  const [selectedStatus, setSelectedStatus] = useState<string>('전체')

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      setLoading(true)
      const response = await getCurrentEmptyRooms()
      setRooms(response.rooms)
    } catch (error) {
      console.error('Error loading rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.includes(searchQuery) || room.building.includes(searchQuery)
    const matchesBuilding = selectedBuilding === '전체' || room.building === selectedBuilding
    const matchesFloor = selectedFloor === '전체' || room.floor === parseInt(selectedFloor)
    const matchesStatus = selectedStatus === '전체' || room.status === selectedStatus
    return matchesSearch && matchesBuilding && matchesFloor && matchesStatus
  })

  const buildings = ['전체', '제1과학관', '인문사회관', '제2과학관']
  const floors = ['전체', '1', '2', '3', '4', '5']
  const currentTime = format(new Date(), 'yyyy년 M월 d일 (E) HH:mm', { locale: ko })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-h2 text-text-primary mb-6">실시간 강의실 사용</h1>
      
      <div className="mb-6">
        <p className="text-body text-text-secondary mb-4">현재 시간: {currentTime}</p>
        
        <div className="mb-4">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="강의실 번호 또는 건물명 검색..."
          />
        </div>

        <div className="mb-3">
          <p className="text-body-small text-text-secondary mb-2">건물 선택</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {buildings.map((building) => (
              <button
                key={building}
                onClick={() => setSelectedBuilding(building)}
                className={`px-4 py-2 rounded-md text-body font-medium whitespace-nowrap transition-colors ${
                  selectedBuilding === building
                    ? 'bg-burgundy text-white'
                    : 'bg-background-card border border-border text-text-primary hover:bg-background'
                }`}
              >
                {building}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-body-small text-text-secondary mb-2">층 선택</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-4 py-2 rounded-md text-body font-medium whitespace-nowrap transition-colors ${
                  selectedFloor === floor
                    ? 'bg-burgundy text-white'
                    : 'bg-background-card border border-border text-text-primary hover:bg-background'
                }`}
              >
                {floor === '전체' ? '전체' : `${floor}층`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-body-small text-text-secondary mb-2">상태별 필터</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedStatus('전체')}
              className={`px-4 py-2 rounded-md text-body-small font-medium whitespace-nowrap transition-colors ${
                selectedStatus === '전체'
                  ? 'bg-burgundy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체: {rooms.length}개
            </button>
            <button
              onClick={() => setSelectedStatus('empty')}
              className={`px-4 py-2 rounded-md text-body-small font-medium whitespace-nowrap transition-colors ${
                selectedStatus === 'empty'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              빈 강의실: {rooms.filter(r => r.status === 'empty').length}개
            </button>
            <button
              onClick={() => setSelectedStatus('occupied')}
              className={`px-4 py-2 rounded-md text-body-small font-medium whitespace-nowrap transition-colors ${
                selectedStatus === 'occupied'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              수업 중: {rooms.filter(r => r.status === 'occupied').length}개
            </button>
            <button
              onClick={() => setSelectedStatus('upcoming')}
              className={`px-4 py-2 rounded-md text-body-small font-medium whitespace-nowrap transition-colors ${
                selectedStatus === 'upcoming'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              곧 시작: {rooms.filter(r => r.status === 'upcoming').length}개
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-body text-text-secondary">로딩 중...</p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-body text-text-secondary">조건에 맞는 강의실을 찾을 수 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredRooms.map((room) => {
              const hasComputer = room.facilities?.some((f: any) => f.id === 'computer' && f.available)
              
              return (
                <Card key={room.id} variant="room" roomStatus={room.status} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-h4 text-text-primary font-semibold">
                          {room.building} {room.roomNumber}
                        </h3>
                        {hasComputer && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            💻 컴퓨터실
                          </span>
                        )}
                      </div>
                      <Badge status={room.status} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-body text-text-primary">
                      수용 인원: {room.capacity}명
                    </p>
                    {room.status === 'occupied' && room.currentClassName && (
                      <p className="text-body text-burgundy font-medium">
                        수업 중: {room.currentClassName}
                      </p>
                    )}
                    {room.status === 'occupied' && room.remainingTime && (
                      <p className="text-body text-text-secondary">
                        종료: {room.remainingTime} 후
                      </p>
                    )}
                    {room.status === 'upcoming' && room.remainingTime && (
                      <p className="text-body text-orange-600 font-medium">
                        {room.remainingTime} 후 수업 시작
                      </p>
                    )}
                    {room.status === 'upcoming' && room.nextClassTime && (
                      <p className="text-body text-text-secondary">
                        시작 시간: {room.nextClassTime}
                      </p>
                    )}
                    {room.status === 'empty' && room.nextClassTime && (
                      <p className="text-body text-text-secondary">
                        다음 수업: {room.nextClassTime}
                      </p>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
          
          <p className="text-body text-text-secondary text-center mt-4">
            {filteredRooms.length}개의 강의실 표시 중
          </p>
        </>
      )}
    </div>
  )
}
