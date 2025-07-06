# Evangadi Forum 2.0: A Modern Full-Stack Q&A Experience

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://evangadi-forum-beta7.vercel.app/)

Welcome to **Evangadi Forum 2.0**! 🚀

A modern, community-driven Q&A platform built for the next generation of learners and experts. Featuring a beautiful UI, real-time interactions, robust security, and seamless user experience—Evangadi Forum is your go-to place to ask, answer, and connect.

---

## 🛠️ Tech Stack

[![Tech Stack](https://skillicons.dev/icons?i=react,vite,html,css,js,nodejs,express,mysql,postgres,cypress,vscode,git,github,npm,vercel,render&perline=8)](https://skillicons.dev)

- **Frontend**: React, Vite, HTML5, CSS3 (CSS Modules), JavaScript (ES6+), React Router, Axios
- **Backend**: Node.js, Express.js, MySQL, PostgreSQL(For Render DB)
- **Testing**: Cypress (E2E)
- **Dev Tools & Deployment**: VS Code, Git, GitHub, npm, Vercel, Render

---

## 🌟 Key Features & Recent Updates

- **UUID-Based Addressing**: All user profiles and questions use secure, non-sequential UUIDs for privacy and security.
- **Public Profiles with Private Controls**: Profiles are publicly viewable, but only the owner can edit or delete.
- **Modern Authentication**: JWT-based login/signup, with secure password hashing and XSS protection.
- **Dynamic Q&A System**: Post, edit, and answer questions with instant feedback and pre-filled edit forms.
- **Nested Comments & Voting**: Engage in deep discussions and upvote/downvote questions and answers.
- **Responsive, Glassmorphic UI**: Mobile-first, beautiful design with smooth animations and a friendly chatbot.
- **Comprehensive E2E Testing**: Cypress tests for all major user flows, including signup, login, and navigation.
- **Performance & Security**: Indexed DB queries, input sanitization, strict authorization, and rate limiting.
- **Easy Deployment**: Ready for Vercel and Render with optimized build scripts.

---

## 🔒 Security and Performance Enhancements

- **UUIDs for All Public Entities**: Prevents enumeration and scraping.
- **Strict Auth Middleware**: Only owners can edit/delete their content.
- **Input Sanitization**: All user input is sanitized with `xss` on the backend.
- **Optimized Queries**: Fast, indexed DB access for all major endpoints.
- **Rate Limiting**: Protection against brute-force and denial-of-service attacks.

---

## ✅ Testing Strategy

- **Cypress**: End-to-end tests for signup, login, question posting, and navigation. Ensures real user flows work perfectly.

---

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Tesfamichael12/Evangadi-Forum.git
    cd Evangadi-Forum
    ```
2.  **Setup Backend**:
    ```bash
    cd server
    npm install
    # Set up your .env file with database credentials
    npm start
    ```
3.  **Setup Frontend**:
    ```bash
    cd ../client
    npm install
    npm run dev
    ```
4.  **Run Cypress Tests**:
    ```bash
    npm run cypress:open
    ```

---

## 📂 Project Structure

```
Evangadi-Forum/
├── client/           # React frontend
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Utility/
│   │   └── assets/
│   ├── public/
│   └── ...
├── server/           # Node.js backend
│   ├── controller/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   └── ...
└── ...
```

---

## 📝 Credits & Links

- Original repo: [mihret7/Evangadi-Forum](https://github.com/mihret7/Evangadi-Forum)
- UI/UX inspiration: [Evangadi Networks](https://www.evangadi.com/)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Spinner: [react-spinners](https://www.npmjs.com/package/react-spinners)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

> Made with ❤️ by the Evangadi Forum team.

---

## 👥 Contributors

| [<img src="https://github.com/Yo-eden.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="Yo-eden"/><br/>Yo-eden](https://github.com/Yo-eden) | [<img src="https://github.com/HakimcHuu.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="HakimcHuu"/><br/>HakimcHuu](https://github.com/HakimcHuu) | [<img src="https://github.com/ekram-web.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="ekram-web"/><br/>ekram-web](https://github.com/ekram-web) | [<img src="https://github.com/eyale-me.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="eyale-me"/><br/>eyale-me](https://github.com/eyale-me) |
|:---:|:---:|:---:|:---:|
| [<img src="https://github.com/FoziaHusseinEthio.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="FoziaHusseinEthio"/><br/>Fozia Hussein](https://github.com/FoziaHusseinEthio) | [<img src="https://github.com/KETEMAASIRES.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="KETEMAASIRES"/><br/>Ketemaw Asmare](https://github.com/KETEMAASIRES) | [<img src="https://github.com/mihret7.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="mihret7"/><br/>Mihret Bizuayehu](https://github.com/mihret7) | [<img src="https://github.com/Seid-Mohamme.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="Seid-Mohamme"/><br/>Seid Mohammed](https://github.com/Seid-Mohamme) |
| [<img src="https://github.com/simo2313-tec.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="simo2313-tec"/><br/>SIMON GHEBREMEDHIN](https://github.com/simo2313-tec) | [<img src="https://github.com/Tesfamichael12.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="Tesfamichael12"/><br/>Tesfamichael Tafere](https://github.com/Tesfamichael12) | [<img src="https://github.com/teddy-ctrl.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="teddy-ctrl"/><br/>Tewodros Gebretsadkan](https://github.com/teddy-ctrl) | [<img src="https://github.com/ymuluneh.png" width="60" style="border-radius:50%;box-shadow:0 2px 8px #0002;" alt="ymuluneh"/><br/>Yilak Muluneh](https://github.com/ymuluneh) |
