# ## 요구사항

### [ 공통 ]

- PostgreSQL을 이용 해 주세요
- 데이터 모델 간의 관계를 고려하여 onDelete를 설정 해 주세요
- 데이터베이스 시딩 코드를 작성 해 주세요
- 각 API에 적절한 에러 처리를 해 주세요
- 각 API 응답에 적절한 상태 코드를 리턴 하도록 해 주세요<br><br><br>

### [ 스키마 & API 작업 내용 ]

### 1. 중고마켓

- 스키마 작성

  - [x] 모델 선언 : model Product
    - [x] 개별 필드 항목 : id, name, description, price, tag, createdAt, updatedAt
    - [x] 관계형 필드 항목 : comments ( commentProduct[] )

- API 작성
  - [x] 상품 등록(POST)
    - [x] 사용 값 : name, description, price, tag
  - [x] 상품 목록 조회(GET)
    - [x] offset 방식의 페이지네이션 기능 포함
    - [x] 최신순(recent)으로 정렬 가능
    - [x] 검색 가능 : name, description 항목에서 조회
    - [x] 출력 값 : id, name, price, createdAt
  - [x] 상품 상세 조회(GET)
    - [x] Id 값을 활용하여 상품 상세 조회
    - [x] 출력 값 : id, name, description, price, tag, createdAt
  - [x] 상품 수정(PATCH)
    - [x] 수정 가능한 값 : name, description, price, tag
  - [x] 상품 삭제(DELETE)
    - [x] Id 값을 활용하여 상품 삭제
  - [x] 각 API 응답에 적절한 상태 코드 리턴
  - [x] 각 API에 맞는 적절한 에러 처리 진행

### 2. 자유게시판

- 스키마 작성

  - [x] 모델 선언 : model Article
    - [x] 개별 필드 항목 : id, title, content, createdAt, updatedAt
    - [x] 관계형 필드 항목 : comments ( commentArticle[] )

- API 작성
  - [x] 게시글 등록(POST)
    - [x] 사용 값 : title, content
  - [x] 게시글 목록 조회(GET)
    - [x] offset 방식의 페이지네이션 기능 포함
    - [x] 최신순(recent)으로 정렬 가능
    - [x] 검색 가능 : title, content 항목에서 조회
    - [x] 출력 값 : id, title, content, createdAt
  - [x] 게시글 상세 조회(GET)
    - [x] Id 값을 활용하여 게시글 상세 조회
    - [x] 출력 값 : id, title, content, createdAt
  - [x] 게시글 수정(PATCH)
    - [x] 수정 가능한 값 : title, content
  - [x] 게시글 삭제(DELETE)
    - [x] Id 값을 활용하여 게시글 삭제
  - [x] 각 API 응답에 적절한 상태 코드 리턴
  - [x] 각 API에 맞는 적절한 에러 처리 진행

### 3. 댓글

- 스키마 작성

  - [x] 모델 선언 : model commentProduct
    - [x] 개별 필드 항목 : id, content, createdAt, updatedAt
    - [x] 관계형 필드 항목 : productId
  - [x] 모델 선언 : model commentArticle
    - [x] 개별 필드 항목 : id, content, createdAt, updatedAt
    - [x] 관계형 필드 항목 : articleId

- API 작성
  - [x] 댓글 등록(POST)
    - [x] 사용 값 : content
    - [x] 중고 마켓 댓글 등록 API
    - [x] 자유 게시판 댓글 등록 API
  - [x] 댓글 목록 조회(GET)
    - [x] cursor 방식의 페이지네이션 기능 포함
    - [x] 중고 마켓 댓글 목록 조회 API
    - [x] 자유 게시판 댓글 목록 조회 API
    - [x] 출력 값 : id, content, createdAt
  - [x] 댓글 수정(PATCH)
    - [x] 수정 가능한 값 : content
  - [x] 댓글 삭제(DELETE)
    - [x] Id 값을 활용하여 댓글 삭제
  - [x] 각 API 응답에 적절한 상태 코드 리턴
  - [x] 각 API에 맞는 적절한 에러 처리 진행
        <br><br><br>

### [ 기타 작업 내용 ]

### 1. 유효성 검증

- [x] 상품 등록 시 필요한 필드(이름, 설명, 가격 등)의 유효성을 검증하는 미들웨어를 구현
- [x] 게시물 등록 시 필요한 필드(제목, 내용 등)의 유효성을 검증하는 미들웨어를 구현
- [x] (개인 추가) 댓글 등록 시 필요한 필드(내용, 관계 Id)의 유효성을 검증하는 미들웨어를 구현

### 2. 이미지 업로드

- [x] multer 미들웨어를 사용하여 이미지 업로드 API를 구현

### 3. 에러 처리

- [x] errorhandler.js :
  - [x] 모든 예외 상황을 처리할 수 있는 에러 핸들러 미들웨어
  - [x] 서버오류(500), 사용자 입력 오류(400 시리즈), 리소스 찾을 수 없음(404) 등 상황에 맞는 상태값 반환

### 4. 라우트 중복 제거

- [x] 중복퇴는 라우트 경로(예: /users에 대한 get,post 등 요청)를 app.route()로 통합해 중복 제거
- [x] express.Router()를 활용하여 중고마켓 / 자유게시판 관련 라우트를 별도의 모듈로 구분

### 5. 배포

- [x] .env 파일에 환경 변수를 설정
- [x] CORS 설정
- [x] render.com으로 배포
  - [x] 배포 URL : https://panda-market-ilt7.onrender.com/
        <br><br><br><br>

## 주요 변경사항

- Article Service function을 Axios를 사용하여 다시 제작 (aricleSercive_axios.js 파일)
  - [x] getArticleListAxios() : 메소드 - GET / 쿼리 파라미터 : page, pagesize, keyword
  - [x] getArticleAxios() : 메소드 - GET / 쿼리 파라미터 : id
  - [x] creatArticleAxios() : 메소드 - POST / 리퀘스트 : title, content, image
  - [x] PatchArticleAxios() : 메소드 - PATCH / 리퀘스트 : id, title, content, image (id만 필수항목, 나머지는 수정이 필요한 항목만 사용)
  - [x] deleteArticleAxios() : 메소드 - DELETE / 리퀘스트 : id <br><br>
- Article Service / Product Service에서 사용되는 쿼리 파라미터 & 리퀘스트 데이터에 대한 검증 작업 진행
  <br><br><br><br>

## 멘토에게

- 댓글 API 작업 방식

  1. 모델 분리 작업 진행 : 스프린트 미션 3 내용을 재검토 하니, 멘토링 시간에 알려주신 방향으로 작업 하는것이 맞는 것 같아 **comment 모델을 2개로 분리**하였습니다. 다만 <u>*기존 작업들은 재사용을 염두하여 일단은 주석 처리*</u> 하였으니, 검토 하실 때 이점 참고 부탁드립니다! (스프린트 미션 4 작업 시 사용 안하면 지우겠습니다!) <br><br>
  2. 🤔 질문  
     - URL [ /:id 안에 /:id ] 구조 처리 : product DB 안에서 댓글을 찾는 작업(조회, GET)은 성공 했는데, **수정이나 삭제 과정은 구현이 어려워 commentProduct 혹은 commentArticle DB로 직접 접근**하여 진행 하였습니다. 해당 방식에 대한 조언 부탁드립니다.

- 에러 캐치
  - 상황 : 서버에 없는 ID를 불러오니 asyncHandler(비동기 에러 래퍼 함수)에서 에러 메세지를 출력
  - 🤔 질문 1 : "app.js" 맨 아래에 작성한 error 미들웨어 [app.use(errorHandler);] 는 언제 에러를 잡는걸까요? 
  - 🤔 질문 2 : 사용 방식이 잘못 되었다면, 각자의 역할이 있어서 각자 담당한 에러 응답 코드가 있을까요?

- 변수명과 함수명 짓기 
  - 🤔 질문 1 : "productCreate()"함수가 있는 경우, 그 안에서 생성된 product의 이름이 애매합니다
  - 🤔 질문 2 : 개발 작업에서 자주 쓰는 단어? 같은게 있을 것 같은데 혹시 참고하시는 문서가 있다면 추천 부탁드립니다😅 (사실 제가 찾아보려고 했는데, 작업 오류 난거 해결하고 공부 하는것 만으로도 시간을 다 써버리네요 ㅠ 멘토님께 부탁을.. 드립니다..😭)
<br><br>

너무 많은 질문을 드려서 멘토님을 힘들게(?) 해 죄송합니다~ <br>
솔직히 GPT에게 물어보면 금방 해결 하겠지만, 현업을 하고 계시는 멘토님의 조언을 듣고 싶습니다! <br>
천천히 고민 해 보시고 피드백 부탁드립니다. 감사합니다 😊✨🚀👾