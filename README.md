# ApexStore | Full-Stack E-commerce Catalog Capstone

A production-ready, highly performant E-commerce Product Catalog web application built with Node.js, Express, EJS, and modern CSS. This project demonstrates modular frontend architecture, client-side dynamic search and filtering, asset optimization, and cloud deployment.

---

## 🚀 Live Demo & Repository

* **Deployment URL:** https://ecommerce-capstone-inky.vercel.app/
* **GitHub Repository:** https://github.com/devmunk/ecommerce-capstone


---

## 🌟 Key Features

1. **Modular Architecture & Server-Side Rendering (SSR):**
   - Built using Express.js with EJS templating.
   - Clean UI separation using EJS partials (`header.ejs`, `footer.ejs`) for DRY layout management.

2. **Client-Side Routing & Dynamic Filtering:**
   - Asynchronous API endpoints (`/api/products`) powering instant category filtering.
   - Real-time search with client-side debouncing (300ms) to minimize server load.

3. **Performance Optimization:**
   - Express static caching middleware enabled (`maxAge: '1d'`).
   - Native lazy loading on all product catalog image assets (`loading="lazy"`).
   - Lightweight, responsive CSS Flexbox/Grid design without heavy external UI dependencies.

4. **Production Deployment Ready:**
   - Configured for single-click serverless deployment on **Vercel** via serverless output routing (`vercel.json`).

---

## 🛠️ Tech Stack & Architecture

- **Backend / Server:** Node.js, Express.js
- **Templating Engine:** EJS (Embedded JavaScript)
- **Frontend / Styling:** Vanilla JavaScript (ES6+), CSS3 Flexbox & Grid
- **Database / Data Model:** JSON Mock Database (`data/products.json`)
- **Deployment Platform:** Vercel (Serverless Functions)

---

## 📁 Project Structure

```text
ecommerce-capstone/
├── data/
│   └── products.json        # Data store for catalog items
├── public/
│   ├── css/
│   │   └── style.css        # Global modular styles & design system
│   └── js/
│       └── app.js           # Client-side filtering & search script
├── views/
│   ├── partials/
│   │   ├── header.ejs       # Shared header component
│   │   └── footer.ejs       # Shared footer component
│   ├── index.ejs            # Catalog view with filters & grid
│   └── product.ejs          # Single product detailed view
├── package.json             # App dependencies & npm scripts
├── server.js                # Express app entrypoint & API routes
├── vercel.json              # Vercel serverless routing config
└── .gitignore               # Ignored dependencies & log files
```

---

## 🧰 Local Setup & Running Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/ecommerce-capstone.git
   cd ecommerce-capstone
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development / Local Server:**
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your web browser.

---

