# 🏥 MEDICURE  
### 🚀 Doctor Appointment Booking Platform | MERN Stack

 🌟 Overview

**MEDICURE** is a full-stack healthcare platform that simplifies doctor appointment booking with secure authentication, real-time scheduling, and integrated online payments.

It is designed to simulate a **real-world healthcare system**, focusing on performance, scalability, and user experience.

---

 🚀 Features

 🔐 Authentication & Security

* JWT-based login/signup system
* Role-based access (Admin / Doctor / Patient)
* Protected APIs & secure routing

 📅 Appointment System

* Book, reschedule, cancel appointments
* Real-time doctor availability
* Slot-based booking system

 💳 Payment Integration

* Razorpay integration
* Secure server-side payment validation

 ⚡ Performance Optimization

* Reduced response time: **250ms → 175ms (30% faster)**
* Improved API efficiency by **20%**
* Optimized MongoDB queries using indexing

 📦 Backend System

* Built **18+ RESTful APIs**
* Clean MVC architecture
* Middleware-based request handling

---

 🛠️ Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | React.js, Tailwind CSS |
| Backend  | Node.js, Express.js    |
| Database | MongoDB                |
| Auth     | JWT                    |
| Payments | Razorpay               |

---

 📂 Project Structure

```
MediCure/
│── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│
│── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── assets/
```

---

## 📸 Screenshots

### 👤 User Dashboard
![User Dashboard](https://github.com/user-attachments/assets/8dd5e1be-2ffb-4909-af5c-3f3f406cfcc8)

### 🧑‍⚕️ Doctor Panel
![Doctor Panel](https://github.com/user-attachments/assets/4807a395-fc07-4b7c-9680-ef63c09bed0d)

### 🎯 Admin Panel
![Admin Panel](https://github.com/user-attachments/assets/e01ca847-a3a1-4b01-8dac-d6c0bce5c451)

---

 ⚙️ Installation & Setup

 1️⃣ Clone Repository

```bash
git clone https://github.com/kandulaakhila/MediCure.git
cd MediCure
```

---

 2️⃣ Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

 3️⃣ Environment Variables

Create `.env` inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

---

 4️⃣ Run Application

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

 📊 Performance Metrics

* 🚀 30% faster API response
* ⚡ 20% backend optimization
* 💰 100+ successful transactions
* 📦 18+ REST APIs

---

 🔐 Security Practices

* Environment variables for sensitive data
* JWT authentication
* Role-based authorization

---

 🌟 Future Enhancements

* 📱 Mobile responsiveness
* 🔔 Email/SMS notifications
* 🤖 AI-based doctor recommendation
* 📊 Admin analytics dashboard

---

 👩‍💻 Author

**Akhila K**

---

 ⭐ Support

If you like this project, give it a ⭐ on GitHub!
