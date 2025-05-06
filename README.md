# Next.js + Node.js Authentication System (JWT + 2FA)

This project implements a complete authentication flow using:

- ✅ **JWT access + refresh tokens**
- 🔐 **Two-Factor Authentication (2FA)** with TOTP & QR codes
- 🍪 **Secure cookie-based refresh token handling**
- 🧠 **React Context for client-side token management**
- 🔁 **Proxy API routes in Next.js**
- ⚠️ **Middleware for route protection**
- 🧩 Built with: **Next.js 15 (App Router)**, **Node.js**, **Express**, **PostgreSQL**, **Prisma**, and **Tailwind CSS**

---

## 📦 Stack

| Part     | Tech                                 |
| -------- | ------------------------------------ |
| Frontend | Next.js (App Router), Tailwind CSS   |
| Backend  | Node.js, Express, TypeScript         |
| Auth     | JWT (access + refresh), otplib (2FA) |
| DB       | PostgreSQL, Prisma ORM               |

---

## 🧪 Features

- Signup & Login with JWT
- Access token stored in memory
- Refresh token stored in HttpOnly cookie
- 2FA (opt-in) with OTP QR code via otplib
- Protected routes via middleware and React Context
- Password reset (with token, no email service)

---

## 🚀 Clone this repo

```bash
git clone https://github.com/yourname/nextjs-node-auth-jwt-2fa
cd nextjs-node-auth-jwt-2fa
```

📹 Video Tutorial

🔗 [Watch on YouTube](https://youtu.be/H8RxNj492PY?si=yalALRRp2uHGptwO) – Full walkthrough of this project
