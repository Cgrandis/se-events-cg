Install dependencies with `npm install`
Set up your database and update the DATABASE_URL in your environment variables
Run Prisma migrations with `npx prisma migrate dev`
Start the development server with `npm run dev`

# Community Event Management Platform

## 📖 Overview

The **Community Event Management Platform** is a web application designed to help a small community business create and share events with members. The platform allows staff members to create and manage events, while users can browse events, sign up, and add events to their Google Calendar.

## 🚀 Features

### 🔹 **General Features**
- Users can **browse upcoming events**.
- Users can **sign up for events** and receive a confirmation.
- Users can **add events to their Google Calendar** after signing up.
- Authentication via **Google, Email/Password**.

### 🔹 **User Features**
- Users can **sign up for events**.
- Users can **view their profile**.
- Users can **access a toggle menu** to manage their profile and logout.
- Users **who signed up for an event won’t see the "Sign Up" button** again, instead, they see a message **"You're already in!"**.

### 🔹 **Staff Features**
- Staff members can **create events**.
- Staff members can **manage only events they created**.
- Staff members can **edit and delete their events**.
- Staff members have **a dedicated dashboard**.
- Staff members have **a toggle menu** in the navigation that allows them to access their dashboard and logout.

### 🔹 **Admin Features**
- Admins can **manage users and events** (future implementation).

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma (ORM)
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js with Google & Email/Password
- **Deployment:** TBD

## 📂 Folder Structure

