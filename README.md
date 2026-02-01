# Portfolio Website v2

A modern, responsive portfolio website built with React and Vite, showcasing professional experience, projects, education, and skills.

## 🚀 Features

- **Multi-page Navigation**: Home, Experience, Projects, Education, Skills, and Contact pages
- **Responsive Design**: Optimized for all screen sizes
- **Dark/Light Theme**: Theme switching capability
- **Smooth Animations**: Interactive UI with scroll animations and transitions
- **Particle Background**: Dynamic particle effects for visual appeal
- **Resume Downloads**: Multiple resume versions available (Master, Data Engineer, Data Analyst, ML)
- **Project Showcases**: Detailed project descriptions with links and tech stacks

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Custom Hooks** - Reusable logic for theme, scroll, reveal animations, and cursor effects
- **CSS3** - Custom styling with animations

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/rohanjain11/Rohan-Jain.git
cd Rohan-Jain
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🏗️ Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-v2/
├── public/
│   ├── assets/
│   │   ├── docs/          # Resume PDFs
│   │   └── img/           # Images
│   └── favicon*.svg       # Favicons
├── src/
│   ├── components/        # Reusable components
│   │   ├── AnimatedChart.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Nav.jsx
│   │   └── ParticleBackground.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useCardCursor.js
│   │   ├── useReveal.js
│   │   ├── useScroll.js
│   │   └── useTheme.js
│   ├── pages/            # Page components
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── data/
│   │   └── content.js    # Site content and data
│   ├── styles/
│   │   └── index.css     # Global styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🚢 Deployment

This project is configured for deployment to GitHub Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy:
```bash
npm run deploy
```

The site will be live at: **https://rohanjain11.github.io/Rohan-Jain/**

## 📝 Customization

To customize the content, edit the data in `src/data/content.js`:
- Personal information (name, location, contact)
- Education history
- Work experience
- Projects
- Skills
- Links and social media

## 📄 License

This project is private and personal.

## 👤 Author

**Rohan Jain**
- Email: jainrohanj@gmail.com
- GitHub: [@rohanjain11](https://github.com/rohanjain11)
- LinkedIn: [Rohan Jain](https://www.linkedin.com/in/rohan-jain11)

---

Built with ❤️ using React and Vite
