# 🏟️ Sportyfy — Sports Facility Booking Platform

Sportyfy is a full-stack sports facility booking web application built with **Next.js 15** and **TypeScript**. It allows users to browse, explore, and book sports facilities such as soccer courts, tennis courts, and basketball arenas. The platform features a fully functional admin dashboard for managing facilities, categories, time slots, and bookings.

---

## 🚀 Live Demo

> https://sportyfy.devjunayed.com/

---

## ✨ Features

### For Users
- Browse and explore sports facilities with images, ratings, location, capacity, and open hours
- Filter and search facilities by category
- View detailed facility pages with image sliders, highlights, and reviews
- Book a facility by selecting available time slots
- Cancel existing bookings
- User dashboard to track personal booking history

### For Admins
- Secure admin dashboard with analytics (total users, active bookings, monthly revenue, pending requests)
- Revenue chart by month and weekly booking trends
- Top performing facilities overview
- Full CRUD for facilities, categories, and time slots
- Bulk slot generation and single slot creation
- Manage and approve/cancel all bookings
- Add and manage admin accounts

### General
- JWT-based authentication with NextAuth
- Role-based route protection (user / admin)
- Dark/light mode toggle
- Fully responsive UI across all screen sizes
- Toast notifications for user feedback
- Skeleton loaders and loading states

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | HeroUI v2 |
| State Management | Redux Toolkit + Redux Persist |
| Data Fetching | RTK Query |
| Authentication | NextAuth.js + JWT |
| Forms | React Hook Form |
| Animations | Framer Motion |
| Icons | Lucide React, React Icons |
| Carousel | Swiper, React Slick |
| Notifications | Sonner |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (login-register)/     # Login & Register pages
│   ├── (normal)/             # Public-facing pages
│   │   ├── page.tsx          # Home page
│   │   ├── facilities/       # Facility listing & detail pages
│   │   ├── booking/          # Booking page
│   │   ├── about/            # About page
│   │   └── contact/          # Contact page
│   └── admin/
│       └── dashboard/        # Admin dashboard
│           ├── manage-bookings/
│           ├── manage-facilities/
│           ├── manage-category/
│           └── manage-slots/
├── components/
│   ├── Shared/               # Navbar, Footer, Modal, etc.
│   └── UI/                   # Reusable UI buttons, inputs
├── redux/
│   ├── api/                  # RTK Query API slices
│   └── features/             # Redux state slices
├── routes/                   # Role-based route config
├── types/                    # TypeScript type definitions
└── utils/                    # Helper functions
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sportyfy-client.git

# Navigate into the project
cd sportyfy-client

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=your_backend_api_url
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Authentication & Roles

| Role | Access |
|---|---|
| Guest | Browse facilities, view details |
| User | Book facilities, view/cancel own bookings |
| Admin | Full dashboard access, manage all data |




---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
