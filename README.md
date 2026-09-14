# 🍔 Real-Time Kitchen Display System (KDS) & Order Simulator

A high-performance, full-stack real-time Kitchen Display System (KDS) designed to streamline restaurant order workflows and grill queue management. Built with **React 19**, **Node.js**, **Express**, **Socket.io**, and **TypeScript**.

<img width="1886" height="1006" alt="Recording 2026-09-14 at 01 26 22" src="https://github.com/user-attachments/assets/05c4e2cf-35fc-41ab-b2ad-0bf1a6f1be5a" />


## ⚡ Key Features

- **Real-Time Event Synchronisation:** Instant, bi-directional order broadcasting between POS terminals and kitchen screens using WebSockets (Socket.io).
- **Dynamic Patty Queue Aggregation:** Custom React logic calculating total live grill items required based on active pending orders.
- **Urgency Visual Indicators & Timers:** Dynamic order age tracking (`mm:ss`) with visual alerts (Green $\rightarrow$ Yellow $\rightarrow$ Flashing Red) as order thresholds are breached.
- **End-to-End Type Safety:** Strict TypeScript interfaces shared/aligned across client and server environments.
- **Role-Based Views:** Single-page architecture enabling seamless switching between Order Entry (POS) and Line Cook (KDS) modes.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **State & Real-time:** React Hooks (`useState`, `useEffect`), `socket.io-client`
- **Styling:** Modular CSS3 / SCSS (Flexbox, CSS Grid)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-time Server:** Socket.io
- **Language & Execution:** TypeScript, `tsx`

---

## 📐 System Architecture Flow

```text
[ POS Terminal ]  --- (socket.emit 'order:create') ---> [ Express / Socket.io Server ]
                                                                 │
                                                   (io.emit 'order:new' broadcast)
                                                                 │
                                                                 ▼
                                                        [ KDS Grill Screen ]
