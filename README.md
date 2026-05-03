# WeatherNow 🌤️

WeatherNow is a premium, beautifully designed real-time weather web application. It delivers accurate local forecasts, dynamic glassmorphism aesthetics, and lightning-fast performance, ensuring you get your weather insights intuitively and beautifully.

![WeatherNow UI Preview](https://img.shields.io/badge/UI-Glassmorphism-blue?style=for-the-badge) ![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-blue?style=for-the-badge&logo=tailwind-css)

## ✨ Core Features

- **Live Local Forecast**: Instantly view real-time temperature, condition, and location details.
- **Auto Location Detection**: Automatically detects your location using GPS (with a convenient "Locate Me" button in search).
- **Hourly & 7-Day Forecasts**: Scroll smoothly through the next 24 hours and preview the week ahead.
- **Dynamic Glassmorphism UI**: The app's background and aesthetics adapt to the current weather and theme (Light/Dark mode) with stunning blur effects.
- **Favorites System**: Save and manage your favorite cities to quickly check their weather conditions anytime.
- **Offline Caching**: Built-in caching powered by IndexedDB ensures weather data remains accessible even with a spotty connection.
- **Optimized for SEO**: Features standard semantic tags and SEO-optimized metadata.

## 🛠️ Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite`)
- **State Management**: Zustand (Persisted in LocalStorage)
- **Build Tool**: Vite
- **Data Caching**: `idb-keyval` (IndexedDB)
- **API**: OpenWeatherMap API

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/weathernow.git
cd weathernow
```

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the project. You will need an API key from [OpenWeatherMap](https://openweathermap.org/api).

Add your API key to the `.env` file like this:
```env
VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application!

## 📦 Building for Production

To create an optimized production build, run:
```bash
npm run build
```
This will compile the TypeScript code and bundle the Vite application into the `dist/` directory, ready to be deployed to Vercel, Netlify, or your preferred hosting provider.

---
*Built with ❤️ and designed to wow.*
