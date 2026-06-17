# 🌤️ Weather Tracker

A clean, responsive weather dashboard built with vanilla JavaScript, HTML, and CSS — featuring real-time conditions, a 5-day forecast, and light/dark mode.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## ✨ Features

- **Live weather data** — current conditions plus a 5-day forecast, powered by the OpenWeatherMap API
- **Auto location detection** — finds your city automatically via IP geolocation on load
- **City search** — switch to any city from a built-in list
- **Unit toggle** — switch between °C and °F
- **Light / dark mode** — animated toggle, fully themed across the UI
- **Detailed metrics** — humidity, wind speed, visibility, and pressure at a glance

## 🖥️ Tech Stack

- **JavaScript (ES6+)** — async/await, Fetch API, DOM manipulation
- **HTML5 / CSS3** — custom UI built from a Figma design, no frameworks
- **[OpenWeatherMap API](https://openweathermap.org/api)** — weather and forecast data
- **[Font Awesome](https://fontawesome.com/)** — icons
- **[ipinfo.io](https://ipinfo.io/)** — IP-based geolocation

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/Saad-Dogar/weather-tracker.git
   cd weather-tracker
   ```
2. Open `index.html` in your browser — no build step or server required.

## 📁 Project Structure

```
.
├── index.html      # Markup
├── style.css       # Core layout, theming, dashboard styles
├── slider.css      # Toggle switch components (dark mode / unit switch)
└── app.js          # API calls, data processing, DOM updates
```

## 🎯 About This Project

Built as a one-week challenge to learn JavaScript from scratch after working primarily in C++. The goal was to go from zero JS knowledge to a fully working, API-driven web app — covering async data fetching, DOM manipulation, and UI design in the process.

**Time breakdown:**
- JavaScript fundamentals: ~1 day
- API integration: ~half a day
- UI/UX design and CSS: ~2 days

## 🛣️ Roadmap

- [ ] Responsive layout for mobile devices
- [ ] Move API key to environment-based config
- [ ] Migrate to a backend (Node/Express) with database caching
- [ ] Rebuild frontend in React as part of learning the MERN stack
