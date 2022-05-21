# Frontend Interview (code)
[[Lihat Soal](https://d1edrlpyc25xu0.cloudfront.net/ivo-xjk0m9dp8mzgusdw3/docs/upload/3RSlFK4W5J/Frontend-Interview-(code).pdf)] | [[Deployment](https://qiscus-chat-react.vercel.app)] | [[Storybook](https://bwyx.github.io/qiscus-chat-react)]

## 1. Requirement Flow
- [x] user A can login,
- [x] user B can login,
- [x] user A/B create chat room,
- [x] user A send text message with user B,
- [x] user B send image to user A.

## 2. Komponen utama yang harus ada
- [x] List Chat/List chat room - <[Lobby.view.tsx](https://github.com/bwyx/qiscus-chat-react/blob/main/src/views/Lobby.view.tsx)/>
- [x] Input Text - <[ChatInputForm.tsx](https://github.com/bwyx/qiscus-chat-react/blob/main/src/components/chat/ChatInputForm.tsx)/>
- [x] Message List - <[Chat.view.tsx](https://github.com/bwyx/qiscus-chat-react/blob/main/src/views/Chat.view.tsx)/>

## 3. Extra, requirement
- [x] Quick Message, belum ada interaksi dari chat yang masuk, ada di <[ChatInputForm.tsx](https://github.com/bwyx/qiscus-chat-react/blob/main/src/components/chat/ChatInputForm.tsx)/>
- [x] Dark Mode, belum ada manual switch di chat app, di storybook ada.

### Limitation
Source code sedikit berantakan, tampilan, interaksi kurang memuaskan dan..
Sepertinya ada misconfig Cors policy dari sisi server, semua endpoint return Allow Origin '*' kecuali endpoint `qiscus.getUsers()` yang sama sekali tidak return cors headers.

Aku udah open ticket di [support.qiscus.com#7444](https://support.qiscus.com/hc/en-us/requests/7444). Kata supportnya `qiscus.getUsers()` deprecated, namun tidak ada keterangan `@deprecated` di [SDK](https://github.com/qiscus/qiscus-sdk-web-core/blob/6de26893cb33e924767c7cbd0a7301c802fb6911/src/index.js#L1377)-nya, jadi masih tetep kupakai.

Karena CORS adalah browser-level security, aku bypass cors pake ekstensi waktu develop.

### Storybook Components
Aku pilih storybook daripada hanya setup jest/testing library saja. Karena dengan storybook develop dan testing dengan QA lebih mudah, toh di storybook ada integrasi jest dan automation juga

Link: [https://bwyx.github.io/qiscus-chat-react](https://bwyx.github.io/qiscus-chat-react/?path=/story/chat-chatinputform--show-template-message)

### Screenshots
<img src="https://github.com/bwyx/qiscus-chat-react/blob/main/screenshots/login.png" width=20%><img src="https://github.com/bwyx/qiscus-chat-react/blob/main/screenshots/lobby.png" width=20%><img src="https://github.com/bwyx/qiscus-chat-react/blob/main/screenshots/new-chat.png" width=20%><img src="https://github.com/bwyx/qiscus-chat-react/blob/main/screenshots/create-group.png" width=20%><img src="https://github.com/bwyx/qiscus-chat-react/blob/main/screenshots/template-message.png" width=20%><img src="https://github.com/bwyx/qiscus-chat-react/blob/main/screenshots/profile.png" width=20%>
