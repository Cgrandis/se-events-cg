# 🧑‍🤝‍🧑 Community Event Management Platform

## 📖 Overview

The **Community Event Management Platform** is a web application built to help small community businesses create, manage, and share events. It features role-based access:  
- **Staff members** can create, edit, and manage events via a dashboard.  
- **Users** can browse events, sign up, and add events to their Google Calendar.

🔗 **Live App:** [https://v0-se-events-cg.vercel.app](https://v0-se-events-cg.vercel.app)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/community-events-platform.git
cd community-events-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```env
DATABASE_URL=your_database_url_here
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholders with your actual values.

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev
```

### 5. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test Accounts

### 👤 User Account
- **Email:** `jackyep@gmail.com`  
- **Password:** `ops123`

### 👩‍💼 Staff Account
- **Email:** `janeyep@event.com`  
- **Password:** `ops123`

---

## ✨ Features

### 🌐 General Access
- View upcoming events:  
  - [localhost](http://localhost:3000)  
  - [Production](https://v0-se-events-cg.vercel.app)
- Sign up for events and receive confirmation.
- Add events to Google Calendar after sign-up.
- Register/Login to access full features:  
  - [Login Page](https://v0-se-events-cg.vercel.app/auth/login)  
  - [Staff Sign-Up](https://v0-se-events-cg.vercel.app/auth/staff-signup)

### 👥 Logged-in Users
- Sign up for events (once only – see *"You're already in!"* after signing up).
- Access a toggle menu to logout or manage profile:  
  - [User Profile](https://v0-se-events-cg.vercel.app/user/profile)

### 🛠️ Staff Members
- Access a dedicated dashboard:  
  - [Dashboard](https://v0-se-events-cg.vercel.app/dashboard)
- Create new events:  
  - [Create Event](https://v0-se-events-cg.vercel.app/dashboard/create-event)
- Manage existing events:  
  - [Manage Events](https://v0-se-events-cg.vercel.app/dashboard/manage-events)
- Update profile or delete account:  
  - [Manage Profile](https://v0-se-events-cg.vercel.app/dashboard/manage-profile)
- Return to landing page to view all events.

> 🔒 Staff registration is only available via a direct invite link.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes, Prisma (ORM)  
- **Database:** PostgreSQL (via Supabase)  
- **Authentication:** NextAuth.js (Email/Password & Google OAuth)  
- **Deployment:** Vercel  

---

## 📌 Notes

- Do not commit your `.env` file or secrets to version control.
- Ensure Prisma is installed globally if needed.
- Google Calendar integration requires valid OAuth credentials.

---

## 📫 Contact

Feel free to reach out if you’d like to contribute, suggest improvements, or collaborate!