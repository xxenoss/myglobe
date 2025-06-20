# 🌍 Professional Travel Site

This project is a full-featured travel experience platform built with:

- **Next.js** + **Tailwind CSS** frontend
- **MongoDB Atlas** backend
- **JWT Authentication**
- **Email Verification + Forgot Password**
- **Stripe + Manual Subscription Support**
- **User Dashboard** and **Admin Dashboard**

---

## 📦 Project Structure

```
/client
├── components       # UI components (Header, Hero, Modals)
├── pages            # Next.js routes
│   ├── api          # Backend API endpoints
│   ├── dashboard    # Protected user dashboard
│   └── admin        # Protected admin dashboard
├── hooks            # Auth hooks (JWT client-side)
├── lib              # MongoDB + Auth helpers
├── styles           # Tailwind setup
└── public           # Static assets (e.g., globe.js)
```

---

## 🧪 Environment Variables

Create a `.env.local` in `/client`:

```bash
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

---

## 🚀 Deployment Guide

### ✅ FRONTEND (One.com)

1. Run locally:

```bash
cd client
npm install
npm run build
npm run export
```

2. Upload contents of `client/out/` to your **One.com public_html** folder via FTP.

---

### ✅ BACKEND (Render)

1. Create a Render service (Node.js)
2. Point it to `/client/pages/api` as root API directory
3. Set the same environment variables as above
4. Ensure `bodyParser: false` for Stripe webhook route

---

## 🔐 Admin Login

Admin access is based on `role: 'admin'` in the MongoDB user document.

You can promote a user manually in MongoDB Atlas or add logic to `/admin`.

---

## 🧑‍💻 Authors

XXENOSS
