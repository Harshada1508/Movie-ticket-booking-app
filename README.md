# 🎟️ Ticket Booking App

Hey there! 👋  
This is a **Movie Ticket Booking Web App** that I built as part of my internship project. It’s a fully functional platform where users can browse shows, book seats, pay securely using Razorpay, and even download their booking receipts!

---

## 💡 What This App Does

- 🧑‍💻 **User Login & Registration**  
  Users can sign up and log in using their email & password. Email verification is also included!

- 🏠 **Homepage with Movies**  
  Displays a list of movies/shows (I added 8+!) — each with a dedicated details page.

- 🪑 **Seat Booking**  
  Users can select seats in a nice grid format. Booked seats get locked and can't be booked again by others.

- 💳 **Secure Payments with Razorpay**  
  Checkout is integrated with Razorpay for smooth and secure transactions.

- 📋 **View Bookings + Receipt Download**  
  Users can view all their bookings in a separate "My Bookings" section. Each booking has a **PDF download option** for receipts.

- 📱 **Responsive Design**  
  Works perfectly on phones, tablets, and desktops. Styled with a clean dark theme UI.

---

## 🛠️ Tech I Used

- React + Redux for frontend & state management
- Firebase Auth & Firestore for backend & authentication
- Razorpay API for handling payments
- jsPDF for downloading receipts as PDF
- Firebase Hosting for deployment

---

## 🖼️ Screenshots

Open "Snap_Shots" Folder to see output images

---

## 📌 Some Extra Stuff I Added

- 🔒 Route protection – Only logged-in users can book or view bookings
- 📧 Email verification after sign-up
- 🧾 Downloadable PDF receipts for each booking
- 🎨 Custom styling with a clean and modern dark theme

---

## 🚀 Getting Started (If You Want to Run It Locally)

```bash
git clone https://github.com/your-username/ticket-booking-app.git
cd ticket-booking-app
npm install
npm start
