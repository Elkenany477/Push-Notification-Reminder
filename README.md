# 📦 Reminder Notify Task (React Native + Expo)

A simple **React Native (Expo)** app that allows users to:
- Add tasks
- Display tasks in a list
- Send **push notifications** when a new task is added  
(using **Expo Notifications**)


https://github.com/user-attachments/assets/164dfcbc-45e8-4557-b1e2-ad44a858b68c


---

## 🚀 Features

- ✅ Add task with **title & body**
- 📃 Display tasks using FlatList
- 🔔 Send push notification on task creation
- 📱 Works on **Android & iOS (physical device required)**
- 🧩 Clean service-based notification logic

---

## 🛠 Tech Stack

- **React Native**
- **Expo**
- **Expo Notifications**
- **JavaScript (Hooks)**

---

## 📂 Project Structure

src/
│
├── components/
│ └── ServiceNotification.js # Push notification service
│
├── screens/
│ └── ReminderNotfyTask.js # Main screen
│
└── App.js

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/reminder-notify-task.git
cd reminder-notify-task

## 2️⃣ Install dependencies

**npm install**


## 3️⃣ Install Expo Notifications

**expo install expo-notifications expo-device**

## 4️⃣ Run the app

**expo start**

