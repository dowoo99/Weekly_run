![KakaoTalk_Photo_2022-10-04-16-55-33](https://user-images.githubusercontent.com/104764474/193819731-ab83241b-e3b6-4dee-90b4-738e58a6c18e.png)

<br/>
# WeeklyRun
런닝을 하고 싶은데 동기부여가 있으면 좋겠나요?<br/>
한 주간의 목표를 세우고 매일매일 기록을 확인하며 <br/>
유저들과 피드를 공유해보세요!

# 주요기능

### 1. 로그인

- 네이버 와 카카오를 활용한 소셜로그인으로 간편하게 로그인 가능합니다.

### 2. 목표 설정하기

- 한 주간의 목표를 설정하고, 하루하루의 기록을 볼 수 있습니다.

### 3. 런닝 기록하기

- 실시간 위치를 기반으로 런닝을 추적하며 기록 및 피드를 통해 공유할 수 있습니다.

### 4. 피드

- 최신순 및 좋아요 순으로 정렬하여 볼 수 있습니다.
- 좋아요 및 답글,대답글을 이용할 수 있습니다.

### 5. 검색하기

- 해시태그 및 유저 이름을 자동완성 기능을 이용하여 검색할 수 있습니다.

### 6. 답글페이지

- 답글을 입력 할 수 있으며, 슬라이드를 이용하여 수정 및 삭제 가 가능합니다.

### 7. 신고하기 기능

- 부적절한 게시글 을 신고 하거나, 이용중에 발생한 문제에 관해 신고할 수 있는 별도의 페이지가 존재합니다.

# 기술스택

<div align="center">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <br/>
  <img src="https://img.shields.io/badge/react Query-FF4154?style=for-the-badge&logo=react-Query&logoColor=black"> 
  <img src="https://img.shields.io/badge/recoil-61DAFB?style=for-the-badge&logo=recoil&logoColor=black"> 
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> 
  <br/>
   <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> 
   <img src="https://img.shields.io/badge/githubactions-181717?style=for-the-badge&logo=githubactions&logoColor=white"> 
</div>

# 아키텍쳐

![스크린샷 2022-10-03 오후 1 38 59](https://user-images.githubusercontent.com/104764474/193502802-0399a082-4875-405b-9bec-bac7749a3511.png)

# 라이브러리

### 1. React Query

- 서버데이터를 이용하여 다양한 기능을 추가시킬 수 있으며, 서버 데이터와 클라이언트 데이터를 분리하여 사용하기 위함
- Optimistic UI , Invalidate 등을 활용하여 보다 나은 UX를 제공하기 위함

### 2. Recoil

- 리덕스에 불필요하게 비대한 보일러 플레이터를 줄이고, 딱 필요한 만큼의 데이터만 공유하여 사용하기 위함

### 3. @lodable/component

- Code Spitting 이란 ? <br/>
  앱의 규모가 커짐에 따라 Bundling 되어 제공되는 파일의 사이즈도 커지게 됨으로써 앱의 로딩 속도가 느려지게 된다.<br/>
  이러한 문제를 해결하기 위해 Code Splitting을 적용하여 <br/>
  현재 필요한 모듈만 로딩(lazy-load) 되도록 하여 성능을 향상시킬 수 있다.

### 4. browser-image-compression

- 이미지 리사이징을 이용해 이미지 로드시 시간을 줄일 수 있다.

### 5. Yarn Berry

- NPM의 비효율적인 설치 및 유령 의존성 관련 문제를 PnP를 도입함으로써 해결해주고,<br/>
  노드 모듈의 비대한 크기를 줄여주며, 엄격한 의존성 관리 및 검증을 통해
  예기치 못한 버그를 쉽게 일으키던 유령 의존성 현상을 근본적으로 막을 수 있다.

# 트러블 슈팅

<details>
  <summary> 좋아요 기능 react-query optimistic update낙관적 업데이트로 서버업데이트시 UI에서도 어차피 업데이트 할것이란 (낙관적인) 가정으로 미리 UI를 업데이트를 해줌</summary>
  <div markdown="1">

  invalidateQueries를 이용해서, 좋아요를 누를시 바껴야하는 query key들을 초기화를 시켜 화면에서 바로바로 적용키여야함
     자세한 내용은 https://velog.io/@dowoo99/react-queryoptimistic-update%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85  에서 확인 가능합니다.
    
  </div>
</details>

<details>
  <summary>위치를 불러오는 함수와 시간 타이머 함수를 시작 버튼 ,정지 버튼 및 종료 버튼을 이용하여 제어할 수 있어야하며, 일정한 시간 간격으로 함수가 작동해야함</summary>
  <div markdown="1">

    useInterval 커스텀 훅을 사용하여, callback 함수와 delay를 파라미터로 넘겨 delay가 null일 경우 함수가 중단됨
     자세한 내용은 https://velog.io/@dae_eun2/React-useInterval 에서 확인 가능합니다.

  </div>
</details>

<details>
  <summary>위치를 불러오는 함수와 시간 타이머 함수를 시작 버튼 ,정지 버튼 및 종료 버튼을 이용하여 제어할 수 있어야하며, 일정한 시간 간격으로 함수가 작동해야함</summary>
  <div markdown="1">

    useInterval 커스텀 훅을 사용하여, callback 함수와 delay를 파라미터로 넘겨 delay가 null일 경우 함수가 중단됨
     자세한 내용은 https://velog.io/@dae_eun2/React-useInterval 에서 확인 가능합니다.

  </div>
</details>
<details>
  <summary>검색어 입력시 불필요한 요청 및 상태변화가 일어남 </summary>
  <div markdown="1">
    
      검색 인풋에 글씨가 입력될때마다 요청이 간다면 불필요한 요청이 생길뿐만아니라 과도한 요청이 발생할 수가 있음 
      debounce 훅을 만들어서 , value와 delay를 파라미터로 받으며, <br/>setTimeout을 이용하여 일정 시간 동안의 이벤트 발생을 무효화시켜
      change되는 value값의 시간 텀을 조정하여 사용
    
  </div>
</details>
<details>
  <summary>게시글 수정에서 이미지 변경시 데이터 타입에 관한 에러 발생</summary>
  <div markdown="1">
    업로드 이미지를 blob타입으로 백엔드에 넘겨주는데, 기존 이미지는 string타입으로 url주소로 받음 <br />
    기존이미지를 blob타입으로 변경 하여 줄 수가 없어, 기존 이미지를 수정하는것에대한 문제가 발생함 <br />
    
      해결방안 
      백엔드에 prevImage와 newImage를 별도로 전송하여 백엔드측에서 newImage를 업로드 후, prevImage로 합치게끔 하여 문제 해결
    
  </div>
</details>

# 팀원

| 팀원   | 깃허브 주소                | 역할 분담                                                                                       |
| ------ | -------------------------- | ----------------------------------------------------------------------------------------------- |
| 김대은 | https://github.com/Dae-une | 초기세팅,기록하기,게시글 작성,랭킹,신고하기,검색기능,댓글 페이지,깃헙액션,배포,마무리 오류 수정 |
| 김도우 | https://github.com/dowoo99 | 유저페이지, 피드페이지,전체 게시글 컴포넌트,Nav컴포넌트                                                                        |
| 이승준 | https://github.com/lsj3284 | 로그인 페이지,댓글페이지                                                                        |
