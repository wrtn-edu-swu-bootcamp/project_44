/**
 * 특정 시간대 조회 화면
 * 참고: docs/wireframe.md (3. 특정 시간대 조회 화면 섹션)
 */

'use client'

import { useState } from 'react'
import { format, addDays } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { getRoomsInTimeRange, type Room } from '@/lib/api'

export default function TimeRangePage() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [startTime, setStartTime] = useState('14:00')
  const [endTime, setEndTime] = useState('16:00')
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState<string>('전체')
  const [selectedFloor, setSelectedFloor] = useState<string>('전체')
  const [selectedStatus, setSelectedStatus] = useState<string>('전체')

  const handleSearch = async () => {
    try {
      setLoading(true)
      setSearched(true)
      const response = await getRoomsInTimeRange(selectedDate, startTime, endTime)
      setRooms(response.rooms)
    } catch (error) {
      console.error('Error searching rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickSelectDate = (days: number) => {
    const date = addDays(new Date(), days)
    setSelectedDate(format(date, 'yyyy-MM-dd'))
  }

  const quickSelectTime = (range: 'morning' | 'afternoon' | 'evening' | 'all') => {
    switch (range) {
      case 'morning':
        setStartTime('09:00')
        setEndTime('12:00')
        break
      case 'afternoon':
        setStartTime('13:00')
        setEndTime('17:00')
        break
      case 'evening':
        setStartTime('17:00')
        setEndTime('19:00')
        break
      case 'all':
        setStartTime('09:00')
        setEndTime('19:00')
        break
    }
  }

  // 30분 간격 시간 목록 생성 (09:00 ~ 21:00)
  const timeOptions = []
  for (let hour = 9; hour <= 21; hour++) {
    timeOptions.push(`${String(hour).padStart(2, '0')}:00`)
    if (hour < 21) {
      timeOptions.push(`${String(hour).padStart(2, '0')}:30`)
    }
  }

  const formattedDate = format(new Date(selectedDate), 'yyyy년 M월 d일 (E)', { locale: ko })
  
  const buildings = ['전체', '제1과학관', '인문사회관', '제2과학관']
  const floors = ['전체', '1', '2', '3', '4', '5']
  
  const filteredRooms = rooms.filter((room) => {
    const matchesBuilding = selectedBuilding === '전체' || room.building === selectedBuilding
    const matchesFloor = selectedFloor === '전체' || room.floor === parseInt(selectedFloor)
    const matchesStatus = selectedStatus === '전체' || room.status === selectedStatus
    return matchesBuilding && matchesFloor && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-h2 text-text-primary mb-6">특정 시간대 조회</h1>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <h2 className="text-h4 text-text-primary mb-4">날짜 선택</h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            <Button
              variant={selectedDate === format(new Date(), 'yyyy-MM-dd') ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => quickSelectDate(0)}
            >
              오늘
            </Button>
            <Button
              variant={selectedDate === format(addDays(new Date(), 1), 'yyyy-MM-dd') ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => quickSelectDate(1)}
            >
              내일
            </Button>
            <Button
              variant={selectedDate === format(addDays(new Date(), 2), 'yyyy-MM-dd') ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => quickSelectDate(2)}
            >
              모레
            </Button>
          </div>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full"
          />
          <p className="text-body-small text-text-secondary mt-2">
            선택된 날짜: {formattedDate}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-h4 text-text-primary mb-4">시간대 선택</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-body text-text-primary mb-2">시작 시간</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-10 px-3 py-2.5 w-full bg-white border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy border-border"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-body text-text-primary mb-2">종료 시간</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-10 px-3 py-2.5 w-full bg-white border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy border-border"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="secondary" size="sm" onClick={() => quickSelectTime('morning')}>
              오전 (09:00-12:00)
            </Button>
            <Button variant="secondary" size="sm" onClick={() => quickSelectTime('afternoon')}>
              오후 (13:00-17:00)
            </Button>
            <Button variant="secondary" size="sm" onClick={() => quickSelectTime('evening')}>
              저녁 (17:00-19:00)
            </Button>
            <Button variant="secondary" size="sm" onClick={() => quickSelectTime('all')}>
              종일 (09:00-19:00)
            </Button>
          </div>
        </Card>

        <Button onClick={handleSearch} className="w-full" disabled={loading}>
          {loading ? '조회 중...' : '조회하기'}
        </Button>
      </div>

      {searched && (
        <div>
          <h2 className="text-h3 text-text-primary mb-4">
            선택한 시간대: {formattedDate} {startTime} ~ {endTime}
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-body text-text-secondary">로딩 중...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-body text-text-secondary">조건에 맞는 강의실을 찾을 수 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-3">
                <div>
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
                        {room.status === 'occupied' && room.currentClassEndTime && (
                          <p className="text-body text-text-secondary">
                            종료: {room.currentClassEndTime}
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
                        {room.status === 'empty' && (
                          <p className="text-body text-green-600">
                            {startTime}~{endTime} 사용 가능
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
      )}
    </div>
  )
}
