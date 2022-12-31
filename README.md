## URTrader 자동매매 프로그램 ⚡

🧰 세련된 UI 제공을 위해 React와 Electron을 기반으로 제작되었습니다. 🏏 <br /><br />
📈 마틴 게일 배팅법을 기반으로 제작되었습니다. 📉 <br /><br />
🚨 해당 프로그램을 이용한 투자의 책임은 본인에게 있습니다. ⚠ <br /><br />

1.실행 관련 ⚡
-------------
### 1.1 실행 전 키 설정 방법
아래 경로로 들어가 설정 해당 코드를 수정해 주세요.<br />
##### 경로 : public/core/service/AuthService.js

```
const acKey = "여기에 입력해 주세요."
```

### 1.2 실행
##### 기본 실행 (배포x)
```
npm start
```

##### 배포
```
npm release
```
<br />

2.기능 🏏
-------------
### 2.1 매수, 매도 💰
자체 다크모드를 지원하고있으며 실시간으로 코인 가격을 받아 화면에 출력해 줍니다. <br />
또한 자동 매매뿐만 아니라 수동 매매도 지원합니다. <br /><br />
<img src="https://user-images.githubusercontent.com/101415997/210132897-3e847a7c-5d14-44e8-b7a0-06829f2821b7.PNG" witdh="160" height="320"/>

### 2.2 키 관리자 🔑
API KEY 수명은 1년이기에 키 교체는 불가피합니다. 때문에 해당 프로그램은 자체적으로 키 관리자를 통해 손쉽게 교체가 가능합니다. <br />
로컬DB에 이용중인 API KEY가 저장되며 이는 재실행시 변경된 키로 실행됩니다. <br /><br />
<img src="https://user-images.githubusercontent.com/101415997/210133050-c71970a2-19cf-4e14-8067-6b7b29733765.PNG" witdh="160" height="320"/>
