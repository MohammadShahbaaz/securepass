# 🔐 SecurePass – Password Strength & Breach Checker

SecurePass is a cybersecurity-focused web application that helps users evaluate the **strength of their passwords** and checks whether the password has been exposed in **real-world data breaches**.

This project is built for **educational and defensive security purposes only**.

---

## 🚀 Features

- 🔒 **Password Strength Meter**
  - Scores passwords based on length and complexity
  - Displays Weak / Medium / Strong status

- 🧠 **Password Improvement Tips**
  - Real-time suggestions to improve password security
  - Helps users create stronger passwords interactively

- 🛡️ **Data Breach Detection**
  - Checks passwords against known breached datasets
  - Uses industry-standard **k-anonymity** for privacy

- 👁️ **Show / Hide Password Toggle**
  - Improves typing accuracy without compromising security

- ⏳ **Loading & Error Handling**
  - Displays loading state during checks
  - User-friendly maintenance message if server is unavailable

- 🎨 **Dark Cybersecurity UI**
  - Hacker-style dark theme
  - Subtle grid background for professional look

---

## 🧩 Tech Stack

### Frontend
- React.js
- HTML, CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Security & APIs
- SHA-1 hashing
- Have I Been Pwned Passwords API

---

## 🔐 Security & Privacy

- Passwords are **never stored**
- Passwords are **never sent in plain text**
- Only the **first 5 characters of the SHA-1 hash** are sent to the breach API
- This follows the **k-anonymity model**, ensuring user privacy

---

## 🛠️ How to Run Locally

1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/securepass.git
cd securepass
```
2️⃣ Start Backend
```bash

cd server
npm install
node index.js
```
```bash
Server will run on:

http://localhost:5000
```
3️⃣ Start Frontend
```bash
cd client
npm install
npm start
```
```bash
App will open on:

http://localhost:3000
```
⚠️ Disclaimer

This project is intended only for educational purposes.
It does not encourage password misuse or hacking.

👨‍💻 Author

Mohammad Shahbaaz
B.Tech CSE