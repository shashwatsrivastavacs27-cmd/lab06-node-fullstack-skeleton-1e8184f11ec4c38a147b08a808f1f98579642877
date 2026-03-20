# Lab 07 - Multi-Role User System (RBAC)

## 👨‍🎓 Student Details
Name: Akshat  
Enrollment: CS-23411015  
Section: 3CSE15  

---

## 📌 Overview
This project extends Lab 06 by implementing authentication and Role-Based Access Control (RBAC) in a fullstack application.

The system supports three roles:
- USER
- ADMIN
- SUPER_ADMIN

Each role has different permissions enforced using backend middleware and frontend UI rendering.

---

## 📂 Project Structure

lab06-node-fullstack-skeleton  
│  
├── backend  
├── frontend  
└── README.md  

---

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- React
- Axios
- JWT (Authentication)
- bcrypt (Password hashing)
- Git & GitHub

---

## ⚙️ How to Run Backend

cd backend  
npm install  
npm start  

Runs on:  
http://localhost:3000  

---

## ⚙️ How to Run Frontend

cd frontend  
npm install  
npm start  

Runs on:  
http://localhost:3001  

---

## 🔐 Test Account

### SUPER_ADMIN
Email: superadmin@test.com  
Password: 123456  

---

## 🧪 API Routes

### Authentication
- POST /api/auth/register  
- POST /api/auth/login  

### User Routes
- GET /api/users/me  
- GET /api/users  
- POST /api/users  
- PATCH /api/users/:id/role  
- DELETE /api/users/:id  

---

## 🔒 RBAC Rules

- USER:
  - Can view own profile only  

- ADMIN:
  - Can view users  
  - Can create USER  
  - Can delete USER  

- SUPER_ADMIN:
  - Full access  
  - Can change roles  

---

## 🗄️ Database

MongoDB Atlas used  
Database name: lab6db  

---

## 📷 Screenshots

Refer to Lab 07 Report PDF for:
- API Testing (Postman / Thunder Client)  
- RBAC Proof (403 Forbidden cases)  
- UI Screenshots (Login + Dashboards)  

---

## 📚 Notes

- All protected routes require JWT token  
- Unauthorized → 401  
- Forbidden → 403  
- Passwords are stored using bcrypt hashing  

---

## 🔗 Repository

https://github.com/aksha-t022/lab06-node-fullstack-skeleton