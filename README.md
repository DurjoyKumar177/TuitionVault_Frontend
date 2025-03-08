# TuitionsVault

TuitionsVault is a **Django DRF-based web application** designed to help **university students, graduates, and teachers** find tuition opportunities in their local area efficiently and securely. The frontend is built using **HTML, Tailwind CSS, and JavaScript**, providing a clean and user-friendly experience.

---

## 🚀 Features

### 🔐 Authentication
- **Two-step Registration:**
  - Step 1: Users provide basic details (First Name, Last Name, Email, Password, Confirm Password).
  - Step 2: Users submit personal details (Phone Number, Location, Educational Status, Profile Picture, Certificate, Current Organization).
  - Email verification required to activate the account.
- **Custom Forget Password:**
  - Users can reset their password via email.
  - Confirmation email is sent upon successful reset.

### 🏠 Public Access (Unauthorized Users)
- View the **Landing Page** to get an overview of the platform.
- Access the **Job Board** to see available tuition opportunities.
- Filter jobs by **class, location, salary**, and **search by name**.
- View **tuition details**, including routine, subjects, location, salary, and requirements.
- **Contact Us** form to reach out to the admin.

### 👨‍🏫 Authorized Users (Logged-in Users)
#### **📌 Job Board**
- View all available tuition posts.
- Apply for tuition positions from the **Tuition Details** section.
- View the **tuition location on a map**.

#### **📜 My Tuition**
- View active (running) tuition jobs with all necessary details.

#### **📩 My Applications**
- Track **pending tuition applications**.
- Automatically removes filled tuition posts.

#### **📞 Contact Us**
- Reach out to the **admin** for inquiries or request a tuition opportunity.

#### **👤 Profile Management**
- View and update **profile details, profile picture, and certificates**.
- Change password with **old password verification**.
- Receive a confirmation email after successful updates.

#### **📊 History**
- View **application history and approved applications** in a table format.

#### **⭐ Reviews**
- Provide a **star rating and review** for completed tuition jobs.
- Helps other users make informed decisions about tuition opportunities.

#### **🚪 Sign Out**
- Log out securely from the account.

---

## 🛠️ Technologies Used
- **Backend:** Django Rest Framework (DRF)
- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Database:** PostgreSQL / SQLite (Configurable)
- **Authentication:** Custom email verification and password reset

---

## 📂 Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/DurjoyKumar177/TuitionVault_Frontend.git
cd TuitionVault_Frontend
```

### 2️⃣ Open the Project in Live Server
Use the **Live Server** extension in VS Code or any other preferred method to run the project in your browser.

---

## 🎯 Contributing
Contributions are welcome! If you'd like to improve the project, please:
1. **Fork** the repository.
2. **Create a new branch** for your feature.
3. **Submit a pull request** with a detailed explanation.

---

## 📜 License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## 📞 Contact
For inquiries or support, feel free to reach out via the **Contact Us** page in the application.

---

🚀 **TuitionsVault – Making Tuition Hunting Easy & Secure!**

