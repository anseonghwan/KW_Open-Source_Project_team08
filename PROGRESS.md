# Progress Report for Team #08  

## Progress Summary
- Project setup 당시 설정한 "대학 맞춤 추천 프로그램" 주제에서  
  -> "Catch liar(스케치 추리 게임)"로 주제 재설정.  
- 웹 페이지 상의 그림판 UI 구현 (HTML canvas).  
- User의 게임 참여 유형에 따른 페이지 구분 후 각 페이지에 그림 데이터 전송 구현.
- AWS(Amazon Web Service) 서버 구축.
- Client(User)의 서버(웹 페이지) 접속 및 활성화/비활성화 Status 확인.

### Project Schedule
![progress_schedule](/images/progress_schedule.jpg)  
- 서버 구축 후 할당 ip와 연결하여 게임 접속 Web page와 연동 완료.  
- 접속 후 게임 참여 유형(liar, user1, user2, user3)에 대한 참가 접속 Web page 생성.  
- 이에 대해서는 추후 게임 참여 방 생성 및 참가, 랜덤 키워드 및 역할 부여 기능 구현을 통해  
Web page를 세분화하여 구현할 예정.  
- Client의 Server 접속에 대한 Server와 Client 간의 통신 연결 Status를 Front-End를 통해  
직접 확인하며 개발 중에 있음.  
- Client의 Server 접속 후 여러 Event에 대한 서버와의 Data 통신 구현 필요.   
- Client 간 실시간 동기화 통신 구현을 통해 User들의 Sketch data가 동시에 전송되도록 하는  
구현도 추후 완료할 예정.

### Project Screenshot
![enter_webpage](/images/enter_webpage.png)  
게임 Web page 접속 화면 

<br>  

![user_interface](/images/user_interface.png)  
게임 참가 유형(User1) 접속 화면 

<br>  

![user1](/images/server_user1.png)  
![user4](/images/server_user4.png)  
![users](/images/server_users.png)  
서버 내 Clinet(User) 접속 Status 확인


## Individual Progress Status
주제 재설정으로 인한 스케줄 조정을 위해 전체 팀원 오프라인 미팅을 통해   
각 담당 분야 동시 협업 진행.
### Front-End(안성환, 최승환)
- 게임 접속 초입 Web Page 생성
- User 참가 유형 별 접속 Web Page 생성.
- Canvas(그림판) UI 구현
### Back-End(강동민, 김도훈, 송일환)
- 서버 구축 (AWS)
- Client(User)의 Server 접속 구현
- User의 Server 접속 Status 확인(Front-End) 구현


