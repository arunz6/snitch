# Snitch 🛍️

**Snitch** is a full-stack **MERN e-commerce platform** with buyer and seller roles, product variants, cart management, image uploads, and Google OAuth login.

Built as a monorepo with a separate `backend` (Express + MongoDB) and `frontend` (React + Redux Toolkit).

---

## 📁 Project Structure

```
snitch/
├── backend/          # Express REST API
│   └── src/
│       ├── config/       # env config, DB connection
│       ├── controller/   # route handlers (auth, product, cart)
│       ├── dao/          # data-access layer
│       ├── middleware/   # JWT auth, seller-role guard
│       ├── model/        # Mongoose schemas (user, product, cart, price)
│       ├── routers/      # Express route definitions
│       ├── services/     # storage/image service
│       └── validator/    # express-validator request validation
└── frontend/          # React (Vite) client
    └── src/
        ├── app/           # router, Redux store, root App
        └── feature/
            ├── auth/          # login/register, protected routes, auth slice
            ├── cart/          # cart page, cart slice, cart API
            ├── products/      # product listing/detail/dashboard, seller CRUD
            └── sharedcomponent/  # navbar, shared UI
```

---

## ✨ Features

### 👤 Authentication & Users
- Email/password registration and login with hashed passwords (bcrypt)
- JWT-based auth stored in an HTTP-only cookie
- Google OAuth 2.0 login (Passport.js)
- Role-based accounts: **buyer** and **seller**, chosen at registration
- `GET /api/auth/me` to fetch the current logged-in user
- Frontend `Protected` route wrapper that restricts pages by role (e.g. seller-only dashboard)

### 🛒 Products
- Public product listing (`/api/product/allproducts`) and product detail page
- Seller-only product creation with **multi-image upload** (up to 5 images, 5MB each) via Multer + ImageKit
- **Product variants** — each product can have multiple variants (e.g. size/color) with their own images, stock count, and price
- Seller endpoints to add a variant, update variant stock, and delete a variant
- Seller product dashboard to view/manage their own listings
- Multi-currency price schema (INR, USD, EUR, GBP, JPY — defaults to INR)

### 🛍️ Cart
- Add product (with specific variant) to cart
- Fetch the current user's cart
- Cart state managed via Redux Toolkit on the frontend

### 🎨 Frontend
- React 19 + Vite + Tailwind CSS v4
- Redux Toolkit + React Redux for global state (auth, cart, products)
- React Router v7 for client-side routing
- Axios for API calls
- Icons via `lucide-react` and `react-icons`

### ⚙️ Backend
- Express 5 REST API
- MongoDB with Mongoose ODM
- Request validation with `express-validator`
- Centralized env-based config with startup checks (fails fast if required env vars are missing)
- CORS configured for the Vite dev frontend, with credentials support
- Request logging via Morgan

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Redux Toolkit, React Router, Tailwind CSS v4, Axios |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT, bcryptjs, Passport (Google OAuth 2.0) |
| File Uploads | Multer, ImageKit |
| Validation | express-validator |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- A Google OAuth Client ID/Secret (for Google login)
- An ImageKit account (for image uploads)

### 1. Clone the repo

```bash
git clone https://github.com/arunz6/snitch.git
cd snitch
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables (all are required — the server will refuse to start without them):

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWTSECRET=your_jwt_secret
CLINTIDGOOGLE=your_google_client_id
CLINTSECRETGOOGLE=your_google_client_secret
NODE_ENV=development
IMAGEKITPRIVATEKEY=your_imagekit_private_key
IMAGEKITPRUBLICKEY=your_imagekit_public_key
IMAGEKITENDPORT=your_imagekit_url_endpoint
```

Run the backend:

```bash
npm run dev
```

The API will start on `http://localhost:3000` (or whatever `PORT` you set).

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new buyer/seller |
| POST | `/api/auth/login` | Public | Log in with email + password |
| GET | `/api/auth/google` | Public | Start Google OAuth flow |
| GET | `/api/auth/google/callback` | Public | Google OAuth callback |
| GET | `/api/auth/me` | Authenticated | Get current user |
| POST | `/api/product/createproduct` | Seller | Create a product (with images) |
| GET | `/api/product/getproducs` | Seller | Get the seller's own products |
| GET | `/api/product/allproducts` | Public | Get all products |
| GET | `/api/product/productdetail/:id` | Public | Get a single product's detail |
| POST | `/api/product/:id/variants` | Seller | Add a variant to a product |
| PATCH | `/api/product/:id/variants/:variantId/stock` | Seller | Update variant stock |
| DELETE | `/api/product/:id/variants/:variantId` | Seller | Delete a variant |
| POST | `/api/cart/add/:productId/:variantId` | Authenticated | Add item to cart |
| GET | `/api/cart/getcart` | Authenticated | Get current user's cart |

---

## 🗺️ Frontend Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home / product listing | Public |
| `/product/:id` | Product detail | Public |
| `/cart` | Cart | Public/Authenticated |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/seller/createProduct` | Create product | Seller only |
| `/seller/productdashbord` | Seller product dashboard | Seller only |
| `/seller/Sellerproductdetails/:id` | Seller product detail/edit | Seller only |

---

## 📌 Roadmap / Ideas

- [ ] Checkout & payment gateway integration (e.g. Stripe/Razorpay)
- [ ] Order management (order history, order status tracking)
- [ ] Product search & filtering (category, price range, rating)
- [ ] Reviews & ratings
- [ ] Wishlist
- [ ] Admin dashboard for platform-wide moderation
- [ ] Pagination for product listings
- [ ] Unit/integration tests (`npm test` is currently a placeholder)
- [ ] API documentation (Swagger/Postman collection)

---

## 📄 License

No license specified yet — add one (e.g. MIT) if you plan to share this publicly.
