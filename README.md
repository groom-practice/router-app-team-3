
# 프로젝트명
DEEPDIVE 프론트엔드 3기 | 리액트 중급 2일차 팀프로젝트

<br>


## 🚀 프로젝트 실행
```
$ npm i
$ npm run dev
```

<br>


## 👥 팀원 소개 및 역할 분담
| 이름   | 역할                  |
|--------|-----------------------|
| 최가은 | 팀장, routes 설정, PostDetail 기능 개발, 충돌 제거 |
| 권수영 | EditPost 기능 개발 |
| 김기현 | Home 기능 개발  |
| 조연경 | PostList 기능 개발, Modal 컴포넌트 제작  |

<br>


## 🗂️ 폴더 구조
```
🧳src 
├── 📁 apis 			# 서버와의 통신을 담당하는 API 함수 모음 
├── 📁 components 		# 재사용 가능한 UI 컴포넌트 모음 
├── 📁 pages 			# 실제 라우팅되는 페이지 컴포넌트 
├── 📁 layout 			# 공통 레이아웃 정의(Header, Footer, SideBar)
├── 📁 routes 			# 라우터 설정 
└── main.jsx 			# 애플리케이션 루트 컴포넌트


📂src/pages
├── 📁 Home			# 메인 홈페이지
├── 📁 PostList			# 전체 게시글 리스트
├── 📁 PostDetail	        # 개별 게시글 상세 내용
└── 📁 EditPost		        # 게시글 수정 
```

<br>


## ✅ 상세 기능 설명
### 레이아웃
- Header, SideBar, Content(Outlet), Footer로 구성

### 🏠 HOME 페이지(layout)
-  로그인 버튼 클릭 시 `createPortal`을 활용해 로그인 모달 생성
- 모달의 상태 관리는 `state`를 이용해 ON/OFF 
- 로그인 완료 시: 메인 페이지 상단에 "OOO님 반갑습니다" 메시지 출력  
- 로그인 시 기존 "로그인" 버튼이 "로그아웃" 버튼으로 변경  
- 로그아웃 클릭 시 로그인 정보 초기화 및 텍스트 원상복귀  

### 📝 POSTS 페이지 (PostList + PostDetail + EditPost)

#### 🔗 라우팅 흐름
- 게시글 목록:  `/posts`
- 게시글 상세 보기 (ID 기반 동적 라우팅):  `/posts/${id}`
- 게시글 수정 페이지 (edit 추가):  `/posts/{id}/edit`

- 게시글 클릭 → 상세 페이지로 이동  
- 상세 페이지에서 Edit 클릭 → 해당 글 수정 페이지로 이동

#### 📄 PostList (`/posts`)
- API를 통해 전체 게시글 목록 불러오기
- 게시글 클릭 시 해당 게시글 ID 기반으로 상세 페이지(`/posts/{id}`)로 이동
- `Delete` 버튼 클릭 시:
  - 삭제 확인 모달 표시
  - 확인 클릭 시 게시글 삭제 → PostList에서 반영
- 즐겨찾기한 게시글은 localStorage에 저장되어 리스트 **최상단으로 끌어올림**
- 무한스크롤

#### 🔍 PostDetail (`/posts/${id}`)
- 선택된 게시글의 상세 정보 출력 (게시글 아이디, 제목, 본문)
- `Edit` 버튼 클릭 시 → `/posts/{id}/edit`로 이동 (게시글 수정 페이지)
- `즐겨찾기` 버튼 클릭 시:
  - 추가 확인 모달 표시
  - 확인 클릭 시 localStorage에 해당 게시글 정보 저장(“favorites” 저장)

#### ✏️ EditPost (`/posts/${id}/edit`)
- 게시글 제목, 본문 수정용 폼 제공
- 기존 글 수정 시: 해당 ID 기반 데이터 로드 후 수정
- 수정 완료 시: 게시글 상세 페이지(`/posts/{id}`)로 리디렉션 또는 알림 출력
-  마지막으로 수정한 post의 ID 화면 출력

### 🔙 BACK 버튼 기능
- `navigate(-1)`을 활용하여 **이전 페이지로 이동** 기능 구현
- 뒤로 가기 버튼은 PostDetail, EditPost 등 여러 페이지에 사용 가능

<br>


## 🌿 Git 브랜치 

- `main`: 최종 결과물 확인(PR을 통해서 머지)
- `feature/본인이름 영어로`: 본인이 맡은 부분 브랜치 파서 작업

<br>

## 💬 Git 커밋 컨벤션

| 태그       | 설명                                  |
|------------|---------------------------------------|
| feat       | 새로운 기능 추가                       |
| fix        | 버그 수정                             |
| design | 사용자 UI 수정 (CSS 수정)
| refactor   | 코드 리팩토링                         |
| style      | 코드 스타일 수정 (세미콜론, 공백 등) |
| docs       | 문서 수정                             |
| chore      | 설정, 패키지 등 기타 수정             |

### 커밋 컨벤션 작성 방법
`타입: 기능 구현 간단하게 한글로 설명`
Ex) feat: 페이지 라우팅 구현

