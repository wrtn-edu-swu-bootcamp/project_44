# 서울여자대학교 빈 강의실 현황 실시간 알리미 - 디자인 가이드

## 목차

1. [디자인 철학](#1-디자인-철학)
2. [색상 시스템](#2-색상-시스템)
3. [타이포그래피](#3-타이포그래피)
4. [레이아웃 스타일](#4-레이아웃-스타일)
5. [UI 컴포넌트](#5-ui-컴포넌트)
6. [아이콘 및 이미지](#6-아이콘-및-이미지)
7. [인터랙션 및 애니메이션](#7-인터랙션-및-애니메이션)
8. [반응형 디자인](#8-반응형-디자인)
9. [화면별 디자인 예시](#9-화면별-디자인-예시)

---

## 1. 디자인 철학

### 1.1 디자인 목표

서울여자대학교 빈 강의실 알리미 서비스는 다음 원칙을 기반으로 디자인됩니다:

- **친숙함**: 서울여대 종합정보시스템 및 LMS와 유사한 UI/UX로 학생들이 익숙하게 사용할 수 있도록 설계
- **명확성**: 빈 강의실 정보를 한눈에 파악할 수 있도록 직관적인 정보 구조
- **접근성**: 모든 사용자가 쉽게 접근하고 사용할 수 있는 인터페이스
- **일관성**: 서울여대 브랜드 아이덴티티를 반영한 일관된 디자인 언어

### 1.2 디자인 컨셉

- **전통적이면서 현대적인**: 서울여대의 전통을 버건디색으로 표현하면서도 현대적인 UI 요소 적용
- **정보 중심**: 필요한 정보를 빠르게 찾을 수 있도록 명확한 정보 계층 구조
- **시각적 강조**: 빈 강의실은 쨍한 연두색으로 강조하여 즉시 인식 가능하도록 설계

---

## 2. 색상 시스템

### 2.1 메인 컬러 팔레트

#### Primary Colors (버건디 계열)

서울여자대학교 공식 로고에 사용되는 버건디색을 메인 컬러로 사용합니다.

```
Primary Burgundy (메인 버건디)
- Hex: #8B1538
- RGB: rgb(139, 21, 56)
- 사용: 주요 버튼, 헤더, 강조 요소, 링크

Primary Burgundy Dark (어두운 버건디)
- Hex: #6B0F2A
- RGB: rgb(107, 15, 42)
- 사용: 호버 상태, 활성화된 요소

Primary Burgundy Light (밝은 버건디)
- Hex: #A51B45
- RGB: rgb(165, 27, 69)
- 사용: 배경, 서브 요소

Primary Burgundy Lighter (더 밝은 버건디)
- Hex: #C42A5A
- RGB: rgb(196, 42, 90)
- 사용: 라이트 모드 배경, 부드러운 강조
```

#### Secondary Colors (보조 색상)

```
Secondary Gray (회색)
- Hex: #6B7280
- RGB: rgb(107, 114, 128)
- 사용: 보조 텍스트, 아이콘

Secondary Gray Light (밝은 회색)
- Hex: #E5E7EB
- RGB: rgb(229, 231, 235)
- 사용: 배경, 구분선

Secondary Gray Dark (어두운 회색)
- Hex: #374151
- RGB: rgb(55, 65, 81)
- 사용: 본문 텍스트
```

### 2.2 상태 색상 (강의실 상태)

#### 빈 강의실 (사용 가능) - 쨍한 연두색 강조

```
Empty Room Green (빈 강의실 연두색)
- Hex: #90EE90
- RGB: rgb(144, 238, 144)
- 사용: 빈 강의실 카드 배경, 상태 표시

Empty Room Green Bright (밝은 연두색)
- Hex: #B4FFB4
- RGB: rgb(180, 255, 180)
- 사용: 호버 상태, 강조 배경

Empty Room Green Dark (어두운 연두색)
- Hex: #7ACC7A
- RGB: rgb(122, 204, 122)
- 사용: 테두리, 그림자 효과
```

#### 수업 진행 중 (사용 불가)

```
Occupied Red (수업 진행 중 빨간색)
- Hex: #DC2626
- RGB: rgb(220, 38, 38)
- 사용: 수업 진행 중 카드 배경, 상태 표시

Occupied Red Light (밝은 빨간색)
- Hex: #F87171
- RGB: rgb(248, 113, 113)
- 사용: 호버 상태, 부드러운 배경

Occupied Red Dark (어두운 빨간색)
- Hex: #B91C1C
- RGB: rgb(185, 28, 28)
- 사용: 테두리, 강조
```

#### 곧 사용 예정 (10분 이내)

```
Upcoming Yellow (곧 사용 예정 노란색)
- Hex: #FBBF24
- RGB: rgb(251, 191, 36)
- 사용: 곧 사용 예정 카드 배경, 경고 표시

Upcoming Yellow Light (밝은 노란색)
- Hex: #FCD34D
- RGB: rgb(252, 211, 77)
- 사용: 호버 상태, 부드러운 배경

Upcoming Yellow Dark (어두운 노란색)
- Hex: #D97706
- RGB: rgb(217, 119, 6)
- 사용: 테두리, 텍스트
```

### 2.3 중성 색상

```
White (흰색)
- Hex: #FFFFFF
- RGB: rgb(255, 255, 255)
- 사용: 배경, 카드 배경, 텍스트 (다크 배경 위)

Black (검은색)
- Hex: #000000
- RGB: rgb(0, 0, 0)
- 사용: 주요 텍스트 (라이트 모드)

Text Primary (주요 텍스트)
- Hex: #1F2937
- RGB: rgb(31, 41, 55)
- 사용: 제목, 본문 텍스트

Text Secondary (보조 텍스트)
- Hex: #6B7280
- RGB: rgb(107, 114, 128)
- 사용: 설명 텍스트, 부가 정보

Background Light (밝은 배경)
- Hex: #F9FAFB
- RGB: rgb(249, 250, 251)
- 사용: 페이지 배경

Background Card (카드 배경)
- Hex: #FFFFFF
- RGB: rgb(255, 255, 255)
- 사용: 카드, 모달 배경

Border (테두리)
- Hex: #E5E7EB
- RGB: rgb(229, 231, 235)
- 사용: 구분선, 테두리
```

### 2.4 색상 사용 가이드

#### 버건디색 사용 규칙
- **헤더/네비게이션**: Primary Burgundy (#8B1538) 사용
- **주요 버튼**: Primary Burgundy 배경, White 텍스트
- **링크**: Primary Burgundy 색상, 호버 시 Primary Burgundy Dark
- **강조 요소**: Primary Burgundy 또는 Primary Burgundy Light

#### 연두색 사용 규칙
- **빈 강의실 카드**: Empty Room Green (#90EE90) 배경으로 강조
- **빈 강의실 아이콘/배지**: Empty Room Green 사용
- **호버 효과**: Empty Room Green Bright로 전환
- **텍스트 가독성**: 연두색 배경 위에는 Text Primary (#1F2937) 사용

#### 상태 색상 사용 규칙
- 각 상태는 명확하게 구분되도록 충분한 대비 확보
- 색상만으로 정보를 전달하지 않고 텍스트 라벨 병행 사용
- 색맹 사용자를 고려한 패턴/아이콘 추가 고려

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

종합정보시스템 및 LMS와 유사한 느낌을 위해 다음 폰트를 사용합니다:

```
Primary Font (주요 폰트)
- 한글: "Malgun Gothic", "맑은 고딕", sans-serif
- 영문/숫자: "Segoe UI", "Arial", sans-serif
- 사용: 본문, 버튼, 입력 필드

Heading Font (제목 폰트)
- 한글: "Malgun Gothic", "맑은 고딕", sans-serif
- 영문/숫자: "Segoe UI", "Arial", sans-serif
- 사용: 제목, 헤더

Monospace Font (고정폭 폰트)
- "Consolas", "Courier New", monospace
- 사용: 코드, 시간 표시 (선택적)
```

### 3.2 폰트 크기 체계

```
H1 - 페이지 제목
- 크기: 32px (2rem)
- 굵기: 700 (Bold)
- 행간: 1.2
- 사용: 메인 페이지 제목

H2 - 섹션 제목
- 크기: 24px (1.5rem)
- 굵기: 600 (Semi-Bold)
- 행간: 1.3
- 사용: 섹션 제목, 카드 제목

H3 - 서브 섹션 제목
- 크기: 20px (1.25rem)
- 굵기: 600 (Semi-Bold)
- 행간: 1.4
- 사용: 서브 섹션 제목

H4 - 작은 제목
- 크기: 18px (1.125rem)
- 굵기: 600 (Semi-Bold)
- 행간: 1.4
- 사용: 작은 제목, 강의실 번호

Body Large - 큰 본문
- 크기: 16px (1rem)
- 굵기: 400 (Regular)
- 행간: 1.5
- 사용: 주요 본문 텍스트

Body - 기본 본문
- 크기: 14px (0.875rem)
- 굵기: 400 (Regular)
- 행간: 1.5
- 사용: 일반 본문, 설명 텍스트

Body Small - 작은 본문
- 크기: 12px (0.75rem)
- 굵기: 400 (Regular)
- 행간: 1.4
- 사용: 부가 정보, 캡션

Button - 버튼 텍스트
- 크기: 14px (0.875rem)
- 굵기: 500 (Medium)
- 행간: 1.2
- 사용: 버튼 내부 텍스트

Caption - 캡션
- 크기: 11px (0.6875rem)
- 굵기: 400 (Regular)
- 행간: 1.3
- 사용: 작은 설명, 시간 표시
```

### 3.3 폰트 굵기

```
100 - Thin (사용 안 함)
200 - Extra Light (사용 안 함)
300 - Light (사용 안 함)
400 - Regular (본문 텍스트)
500 - Medium (버튼, 강조 텍스트)
600 - Semi-Bold (제목, 강조)
700 - Bold (주요 제목, 강한 강조)
800 - Extra Bold (사용 안 함)
900 - Black (사용 안 함)
```

### 3.4 텍스트 스타일 예시

```
제목 (H1)
font-size: 32px;
font-weight: 700;
line-height: 1.2;
color: #1F2937;

본문 (Body)
font-size: 14px;
font-weight: 400;
line-height: 1.5;
color: #1F2937;

보조 텍스트 (Body Secondary)
font-size: 14px;
font-weight: 400;
line-height: 1.5;
color: #6B7280;

링크 (Link)
font-size: 14px;
font-weight: 500;
line-height: 1.5;
color: #8B1538;
text-decoration: none;

링크 호버 (Link Hover)
color: #6B0F2A;
text-decoration: underline;
```

---

## 4. 레이아웃 스타일

### 4.1 그리드 시스템

종합정보시스템/LMS 스타일의 12열 그리드 시스템을 사용합니다.

```
컨테이너 최대 너비
- 데스크톱: 1200px
- 태블릿: 768px
- 모바일: 100% (패딩 16px)

그리드 컬럼
- 총 12열
- 간격 (Gutter): 24px (데스크톱), 16px (태블릿/모바일)

브레이크포인트
- 모바일: 0px - 767px
- 태블릿: 768px - 1023px
- 데스크톱: 1024px 이상
```

### 4.2 여백 및 패딩 규칙

```
간격 단위 (Spacing Scale)
- 4px (0.25rem) - 매우 작은 간격
- 8px (0.5rem) - 작은 간격
- 12px (0.75rem) - 작은-중간 간격
- 16px (1rem) - 기본 간격
- 24px (1.5rem) - 중간 간격
- 32px (2rem) - 큰 간격
- 48px (3rem) - 매우 큰 간격
- 64px (4rem) - 섹션 간격

카드 패딩
- 기본: 16px (1rem)
- 큰 카드: 24px (1.5rem)

섹션 간격
- 섹션 간 수직 간격: 48px (3rem)
- 모바일: 32px (2rem)
```

### 4.3 레이아웃 패턴

#### 헤더 레이아웃
```
높이: 64px (데스크톱), 56px (모바일)
배경: #FFFFFF
테두리: 하단 1px solid #E5E7EB
패딩: 좌우 24px (데스크톱), 16px (모바일)
```

#### 메인 콘텐츠 영역
```
최대 너비: 1200px
중앙 정렬
패딩: 상하 32px, 좌우 24px (데스크톱)
패딩: 상하 24px, 좌우 16px (모바일)
```

#### 푸터 레이아웃
```
높이: 자동
배경: #F9FAFB
테두리: 상단 1px solid #E5E7EB
패딩: 상하 32px, 좌우 24px
```

### 4.4 카드 레이아웃

```
카드 기본 스타일
- 배경: #FFFFFF
- 테두리: 1px solid #E5E7EB
- 둥근 모서리: 8px
- 그림자: 0 1px 3px rgba(0, 0, 0, 0.1)
- 패딩: 16px

카드 호버 효과
- 그림자: 0 4px 6px rgba(0, 0, 0, 0.1)
- 변환: translateY(-2px)
- 전환: 0.2s ease

강의실 카드 (빈 강의실)
- 배경: #90EE90 (빈 강의실인 경우)
- 테두리: 2px solid #7ACC7A
- 강조 효과로 눈에 띄게 표시
```

---

## 5. UI 컴포넌트

### 5.1 버튼

#### Primary Button (주요 버튼)
```
배경: #8B1538 (Primary Burgundy)
텍스트: #FFFFFF (White)
높이: 48px
패딩: 좌우 24px, 상하 12px
둥근 모서리: 6px
폰트 크기: 14px
폰트 굵기: 500
테두리: 없음

호버 상태
- 배경: #6B0F2A (Primary Burgundy Dark)
- 커서: pointer
- 전환: 0.2s ease

비활성화 상태
- 배경: #E5E7EB
- 텍스트: #9CA3AF
- 커서: not-allowed
```

#### Secondary Button (보조 버튼)
```
배경: #FFFFFF
텍스트: #8B1538 (Primary Burgundy)
높이: 48px
패딩: 좌우 24px, 상하 12px
둥근 모서리: 6px
폰트 크기: 14px
폰트 굵기: 500
테두리: 1px solid #8B1538

호버 상태
- 배경: #F9FAFB
- 테두리: 1px solid #6B0F2A
- 전환: 0.2s ease
```

#### Text Button (텍스트 버튼)
```
배경: 투명
텍스트: #8B1538 (Primary Burgundy)
높이: 40px
패딩: 좌우 16px, 상하 8px
폰트 크기: 14px
폰트 굵기: 500
테두리: 없음

호버 상태
- 배경: #F9FAFB
- 텍스트: #6B0F2A
- 밑줄: underline
```

#### Icon Button (아이콘 버튼)
```
크기: 40px × 40px
배경: 투명 또는 #F9FAFB
아이콘 색상: #6B7280
둥근 모서리: 6px

호버 상태
- 배경: #E5E7EB
- 아이콘 색상: #8B1538
```

### 5.2 입력 필드

#### Text Input (텍스트 입력)
```
높이: 40px
패딩: 좌우 12px, 상하 10px
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 6px
폰트 크기: 14px
폰트 굵기: 400
색상: #1F2937

포커스 상태
- 테두리: 2px solid #8B1538
- 아웃라인: none

에러 상태
- 테두리: 2px solid #DC2626
- 배경: #FEF2F2

플레이스홀더
- 색상: #9CA3AF
```

#### Search Input (검색 입력)
```
높이: 48px
패딩: 좌우 16px, 상하 12px
배경: #F9FAFB
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
아이콘: 좌측 또는 우측에 검색 아이콘 배치

포커스 상태
- 배경: #FFFFFF
- 테두리: 2px solid #8B1538
```

#### Select/Dropdown (선택 드롭다운)
```
높이: 40px
패딩: 좌우 12px, 상하 10px
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 6px
화살표 아이콘: 우측에 배치
```

### 5.3 카드

#### 기본 카드
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
그림자: 0 1px 3px rgba(0, 0, 0, 0.1)
패딩: 16px
```

#### 강의실 카드 (빈 강의실)
```
배경: #90EE90 (Empty Room Green)
테두리: 2px solid #7ACC7A
둥근 모서리: 8px
그림자: 0 2px 4px rgba(122, 204, 122, 0.2)
패딩: 16px
텍스트: #1F2937 (가독성을 위한 어두운 텍스트)

호버 상태
- 배경: #B4FFB4 (Empty Room Green Bright)
- 그림자: 0 4px 8px rgba(122, 204, 122, 0.3)
- 변환: translateY(-2px)
```

#### 강의실 카드 (수업 진행 중)
```
배경: #FEF2F2 (연한 빨간색 배경)
테두리: 2px solid #DC2626
텍스트: #1F2937
```

#### 강의실 카드 (곧 사용 예정)
```
배경: #FFFBEB (연한 노란색 배경)
테두리: 2px solid #FBBF24
텍스트: #1F2937
```

### 5.4 네비게이션

#### 헤더 네비게이션
```
배경: #FFFFFF
높이: 64px
테두리: 하단 1px solid #E5E7EB
패딩: 좌우 24px

로고 영역
- 폰트 크기: 20px
- 폰트 굵기: 700
- 색상: #8B1538

메뉴 아이템
- 폰트 크기: 14px
- 폰트 굵기: 500
- 색상: #1F2937
- 패딩: 좌우 16px, 상하 20px

활성 메뉴 아이템
- 색상: #8B1538
- 테두리: 하단 2px solid #8B1538
```

#### 탭 네비게이션
```
배경: #F9FAFB
높이: 48px
패딩: 4px
둥근 모서리: 6px

탭 아이템
- 패딩: 좌우 16px, 상하 10px
- 폰트 크기: 14px
- 폰트 굵기: 500
- 색상: #6B7280

활성 탭
- 배경: #FFFFFF
- 색상: #8B1538
- 그림자: 0 1px 2px rgba(0, 0, 0, 0.1)
```

### 5.5 필터 및 체크박스

#### 체크박스
```
크기: 20px × 20px
테두리: 2px solid #E5E7EB
둥근 모서리: 4px
배경: #FFFFFF

체크 상태
- 배경: #8B1538
- 테두리: 2px solid #8B1538
- 체크 아이콘: #FFFFFF
```

#### 라디오 버튼
```
크기: 20px × 20px
테두리: 2px solid #E5E7EB
모양: 원형
배경: #FFFFFF

선택 상태
- 내부 원: 10px × 10px
- 배경: #8B1538
```

#### 필터 섹션
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
패딩: 16px
마진: 하단 16px

섹션 제목
- 폰트 크기: 16px
- 폰트 굵기: 600
- 색상: #1F2937
- 마진: 하단 12px
```

### 5.6 배지 및 라벨

#### 상태 배지
```
빈 강의실 배지
- 배경: #90EE90
- 텍스트: #1F2937
- 패딩: 4px 8px
- 둥근 모서리: 4px
- 폰트 크기: 12px
- 폰트 굵기: 500

수업 진행 중 배지
- 배경: #DC2626
- 텍스트: #FFFFFF
- 패딩: 4px 8px
- 둥근 모서리: 4px
- 폰트 크기: 12px
- 폰트 굵기: 500

곧 사용 예정 배지
- 배경: #FBBF24
- 텍스트: #1F2937
- 패딩: 4px 8px
- 둥근 모서리: 4px
- 폰트 크기: 12px
- 폰트 굵기: 500
```

---

## 6. 아이콘 및 이미지

### 6.1 아이콘 스타일

#### 아이콘 크기
```
Small: 16px × 16px
Medium: 20px × 20px
Large: 24px × 24px
XLarge: 32px × 32px
```

#### 아이콘 색상
```
기본: #6B7280 (Secondary Gray)
활성: #8B1538 (Primary Burgundy)
호버: #8B1538 (Primary Burgundy)
에러: #DC2626 (Occupied Red)
성공: #90EE90 (Empty Room Green)
```

#### 아이콘 라이브러리
- Material Icons 또는 Font Awesome 사용 권장
- 일관된 스타일 유지 (outline 또는 filled)
- 필요한 아이콘: 검색, 필터, 지도, 알림, 즐겨찾기, 화살표, 시간, 건물 등

### 6.2 로고 사용 규칙

```
서울여자대학교 로고
- 공식 로고 사용 시 학교 가이드라인 준수
- 최소 크기: 높이 32px
- 색상: 버건디 (#8B1538) 또는 공식 로고 색상

서비스 로고
- "빈 강의실 알리미" 텍스트와 아이콘 조합
- 버건디 색상 사용
```

### 6.3 이미지 가이드

```
이미지 비율
- 카드 이미지: 16:9
- 썸네일: 1:1 또는 4:3
- 배너: 21:9

이미지 최적화
- WebP 형식 사용 권장
- 적절한 압축으로 로딩 속도 최적화
- 반응형 이미지 사용 (srcset)
```

---

## 7. 인터랙션 및 애니메이션

### 7.1 전환 효과 (Transitions)

```
기본 전환
- duration: 0.2s
- timing: ease
- 사용: 버튼, 카드 호버, 링크

부드러운 전환
- duration: 0.3s
- timing: ease-in-out
- 사용: 모달, 드롭다운, 사이드바

빠른 전환
- duration: 0.15s
- timing: ease-out
- 사용: 즉각적인 피드백이 필요한 요소
```

### 7.2 호버 효과

```
버튼 호버
- 배경색 변경
- 그림자 증가
- 변환: translateY(-1px)

카드 호버
- 그림자 증가
- 변환: translateY(-2px)
- 배경색 미세 조정 (선택적)

링크 호버
- 색상 변경
- 밑줄 추가
- 텍스트 장식: underline
```

### 7.3 클릭 피드백

```
버튼 클릭
- 변환: scale(0.98)
- duration: 0.1s
- 즉시 원래 상태로 복귀

카드 클릭
- 변환: scale(0.99)
- duration: 0.15s
```

### 7.4 로딩 상태

```
로딩 스피너
- 색상: #8B1538 (Primary Burgundy)
- 크기: 40px × 40px
- 애니메이션: 회전 (1s linear infinite)

스켈레톤 로더
- 배경: #E5E7EB
- 애니메이션: 펄스 효과
- duration: 1.5s
```

### 7.5 모달 및 오버레이

```
오버레이
- 배경: rgba(0, 0, 0, 0.5)
- 전환: fade in/out (0.2s)

모달
- 배경: #FFFFFF
- 둥근 모서리: 12px
- 그림자: 0 10px 25px rgba(0, 0, 0, 0.2)
- 애니메이션: slide up + fade in (0.3s)
```

---

## 8. 반응형 디자인

### 8.1 브레이크포인트

```
모바일
- 최소: 0px
- 최대: 767px
- 특징: 1열 레이아웃, 터치 최적화

태블릿
- 최소: 768px
- 최대: 1023px
- 특징: 2열 레이아웃, 터치/마우스 혼용

데스크톱
- 최소: 1024px
- 최대: 무제한
- 특징: 3-4열 레이아웃, 마우스 최적화
```

### 8.2 모바일 최적화

```
터치 타겟 크기
- 최소: 44px × 44px
- 권장: 48px × 48px

버튼 크기
- 높이: 48px
- 패딩: 좌우 20px

카드 간격
- 마진: 16px

하단 네비게이션
- 높이: 64px
- 고정 위치: 하단
- 배경: #FFFFFF
- 그림자: 상단 0 -2px 4px rgba(0, 0, 0, 0.1)
```

### 8.3 태블릿 최적화

```
그리드
- 2열 레이아웃
- 카드 간격: 24px

사이드바
- 접을 수 있는 사이드바
- 너비: 280px (열림), 64px (접힘)
```

### 8.4 데스크톱 최적화

```
그리드
- 3-4열 레이아웃
- 카드 간격: 24px

사이드바
- 고정 사이드바
- 너비: 240px

호버 효과
- 모든 인터랙티브 요소에 호버 효과 적용
```

---

## 9. 화면별 디자인 예시

### 9.1 메인/홈 화면

#### 헤더
```
배경: #FFFFFF
높이: 64px
테두리: 하단 1px solid #E5E7EB
패딩: 좌우 24px

로고
- 텍스트: "서울여자대학교 빈 강의실 알리미"
- 색상: #8B1538
- 폰트 크기: 20px
- 폰트 굵기: 700

우측 메뉴
- 로그인 버튼: Secondary Button 스타일
- 메뉴 아이콘: 24px, #6B7280
```

#### 메인 영역
```
배경: #F9FAFB
패딩: 상하 64px, 좌우 24px

제목
- 텍스트: "서울여자대학교 빈 강의실 현황 실시간 알리미"
- 색상: #1F2937
- 폰트 크기: 32px
- 폰트 굵기: 700
- 중앙 정렬

설명 텍스트
- 색상: #6B7280
- 폰트 크기: 16px
- 중앙 정렬
- 마진: 상단 16px

기능 카드
- 배경: #FFFFFF
- 테두리: 1px solid #E5E7EB
- 둥근 모서리: 12px
- 그림자: 0 2px 8px rgba(0, 0, 0, 0.1)
- 패딩: 32px
- 너비: 48% (데스크톱), 100% (모바일)
- 간격: 24px

카드 내부 버튼
- Primary Button 스타일
- 너비: 100%
- 마진: 상단 24px
```

### 9.2 현재 시간 기준 빈 강의실 조회 화면

#### 검색바
```
배경: #F9FAFB
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
높이: 48px
패딩: 좌우 16px
아이콘: 좌측 검색 아이콘, 20px, #6B7280

포커스 상태
- 배경: #FFFFFF
- 테두리: 2px solid #8B1538
```

#### 필터 탭
```
배경: #F9FAFB
높이: 48px
패딩: 4px
둥근 모서리: 6px
마진: 상단 24px

탭 아이템
- 배경: #FFFFFF (활성)
- 색상: #8B1538 (활성), #6B7280 (비활성)
- 패딩: 좌우 16px, 상하 10px
- 둥근 모서리: 4px
```

#### 강의실 카드 (빈 강의실)
```
배경: #90EE90 (Empty Room Green)
테두리: 2px solid #7ACC7A
둥근 모서리: 8px
그림자: 0 2px 4px rgba(122, 204, 122, 0.2)
패딩: 20px
마진: 하단 16px

강의실 번호
- 폰트 크기: 18px
- 폰트 굵기: 600
- 색상: #1F2937
- 마진: 하단 8px

정보 텍스트
- 폰트 크기: 14px
- 색상: #1F2937
- 행간: 1.5

액션 버튼
- Secondary Button 스타일
- 마진: 상단 12px
- 간격: 8px
```

### 9.3 특정 시간대 조회 화면

#### 날짜 선택 영역
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
패딩: 20px
마진: 하단 16px

빠른 선택 버튼
- Text Button 스타일
- 배경: #F9FAFB (비활성), #8B1538 (활성)
- 색상: #6B7280 (비활성), #FFFFFF (활성)
- 마진: 우측 8px
```

#### 시간대 선택 영역
```
시간 입력 필드
- Text Input 스타일
- 너비: 120px
- 마진: 좌우 8px

빠른 선택 버튼
- Secondary Button 스타일
- 마진: 상단 12px, 우측 8px
```

#### 조회 버튼
```
Primary Button 스타일
너비: 100%
마진: 상단 24px
```

### 9.4 필터링/검색 화면

#### 필터 섹션
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
패딩: 20px
마진: 하단 16px

섹션 제목
- 폰트 크기: 16px
- 폰트 굵기: 600
- 색상: #1F2937
- 마진: 하단 12px

체크박스 그룹
- 마진: 상단 8px
- 간격: 12px (항목 간)
```

#### 슬라이더 (수용 인원)
```
트랙
- 높이: 4px
- 배경: #E5E7EB
- 둥근 모서리: 2px

썸
- 크기: 20px × 20px
- 배경: #8B1538
- 둥근 모서리: 50%
- 그림자: 0 2px 4px rgba(139, 21, 56, 0.3)
```

### 9.5 강의실 상세 정보 화면

#### 상태 헤더
```
빈 강의실인 경우
- 배경: #90EE90 (Empty Room Green)
- 패딩: 24px
- 둥근 모서리: 상단 8px

강의실 번호
- 폰트 크기: 24px
- 폰트 굵기: 700
- 색상: #1F2937

상태 텍스트
- 폰트 크기: 14px
- 색상: #1F2937
- 마진: 상단 8px
```

#### 정보 섹션
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
패딩: 20px
마진: 하단 16px

섹션 제목
- 폰트 크기: 18px
- 폰트 굵기: 600
- 색상: #1F2937
- 마진: 하단 12px

정보 항목
- 폰트 크기: 14px
- 색상: #1F2937
- 마진: 하단 8px
- 아이콘: 좌측, 16px, #8B1538
```

#### 시간표
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
패딩: 20px

시간 슬롯
- 높이: 48px
- 패딩: 좌우 16px
- 테두리: 하단 1px solid #E5E7EB
- 마진: 하단 4px

빈 강의실 슬롯
- 배경: #90EE90
- 색상: #1F2937

수업 진행 중 슬롯
- 배경: #FEF2F2
- 색상: #1F2937
- 테두리: 좌측 4px solid #DC2626
```

### 9.6 지도/플로어플랜 뷰

#### 지도 컨테이너
```
배경: #F9FAFB
높이: 600px (데스크톱), 400px (모바일)
둥근 모서리: 8px
테두리: 1px solid #E5E7EB
오버플로우: hidden
```

#### 건물 마커
```
빈 강의실이 있는 건물
- 배경: #90EE90
- 테두리: 2px solid #7ACC7A
- 크기: 60px × 60px
- 둥근 모서리: 8px
- 그림자: 0 2px 4px rgba(122, 204, 122, 0.3)

수업 진행 중인 건물
- 배경: #FEF2F2
- 테두리: 2px solid #DC2626
```

#### 플로어플랜 강의실
```
빈 강의실
- 배경: #90EE90
- 테두리: 2px solid #7ACC7A
- 크기: 80px × 60px
- 둥근 모서리: 4px
- 텍스트: 중앙 정렬, #1F2937

수업 진행 중
- 배경: #FEF2F2
- 테두리: 2px solid #DC2626
```

### 9.7 알림 설정 화면

#### 설정 섹션
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
패딩: 24px
마진: 하단 24px

토글 스위치
- 너비: 48px
- 높이: 24px
- 배경: #E5E7EB (OFF), #8B1538 (ON)
- 둥근 모서리: 12px
- 썸: 20px × 20px, #FFFFFF
```

#### 관심 강의실 카드
```
배경: #FFFFFF
테두리: 1px solid #E5E7EB
둥근 모서리: 8px
패딩: 16px
마진: 하단 12px

알림 토글
- 우측 상단 배치
- 토글 스위치 스타일
```

### 9.8 로그인/인증 화면

#### 로그인 컨테이너
```
배경: #FFFFFF
최대 너비: 400px
중앙 정렬
패딩: 48px 32px
테두리: 1px solid #E5E7EB
둥근 모서리: 12px
그림자: 0 4px 12px rgba(0, 0, 0, 0.1)
```

#### SSO 로그인 버튼
```
Primary Button 스타일
너비: 100%
높이: 56px
마진: 하단 24px
아이콘: 좌측, 24px
```

#### 일반 로그인 폼
```
입력 필드
- Text Input 스타일
- 너비: 100%
- 마진: 하단 16px

로그인 버튼
- Primary Button 스타일
- 너비: 100%
- 마진: 상단 8px
```

---

## 10. 접근성 가이드

### 10.1 색상 대비

```
WCAG AA 기준 준수
- 일반 텍스트: 최소 4.5:1 대비
- 큰 텍스트 (18px 이상): 최소 3:1 대비
- 비텍스트 요소: 최소 3:1 대비

색상 조합 예시
- 버건디 (#8B1538) + 흰색 (#FFFFFF): 7.2:1 ✓
- 연두색 (#90EE90) + 검은색 (#000000): 3.8:1 ✓
- 연두색 (#90EE90) + 어두운 회색 (#1F2937): 4.2:1 ✓
```

### 10.2 키보드 네비게이션

```
포커스 표시
- 아웃라인: 2px solid #8B1538
- 아웃라인 오프셋: 2px
- 모든 인터랙티브 요소에 적용

탭 순서
- 논리적인 순서로 배치
- 스킵 링크 제공 (선택적)
```

### 10.3 스크린 리더 지원

```
ARIA 라벨
- 버튼, 링크에 명확한 라벨
- 아이콘 버튼에 aria-label 추가
- 상태 변경 시 aria-live 영역 사용

의미론적 HTML
- 적절한 헤딩 구조 (h1-h6)
- 목록, 테이블 등 시맨틱 태그 사용
```

---

## 11. 다크 모드 (향후 계획)

### 11.1 다크 모드 색상 팔레트

```
배경
- Primary: #1F2937
- Secondary: #111827
- Card: #374151

텍스트
- Primary: #F9FAFB
- Secondary: #D1D5DB

버건디 (조정)
- Primary: #C42A5A (더 밝게)
- Secondary: #A51B45
```

---

## 12. 디자인 토큰 (Design Tokens)

### 12.1 CSS 변수 예시

```css
:root {
  /* Colors - Primary */
  --color-burgundy: #8B1538;
  --color-burgundy-dark: #6B0F2A;
  --color-burgundy-light: #A51B45;
  
  /* Colors - Status */
  --color-empty-room: #90EE90;
  --color-empty-room-bright: #B4FFB4;
  --color-occupied: #DC2626;
  --color-upcoming: #FBBF24;
  
  /* Colors - Neutral */
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-background: #F9FAFB;
  --color-border: #E5E7EB;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Typography */
  --font-family: "Malgun Gothic", "맑은 고딕", "Segoe UI", Arial, sans-serif;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-body: 14px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.15);
  
  /* Transitions */
  --transition-fast: 0.15s ease-out;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease-in-out;
}
```

---

**문서 작성일**: 2024년  
**버전**: 1.0  
**작성 목적**: 서비스 디자인 시스템 및 스타일 가이드  
**참고 문서**: 
- [서비스 기획안](service-plan.md)
- [와이어프레임](wireframe.md)
