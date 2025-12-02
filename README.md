# MTM Holiday Games

AI-powered party games for families, friends, and teams. Copy a prompt, paste into ChatGPT, Claude, or Gemini, and let AI host your game night.

## About

This application is a prompt library website where users copy AI prompts and paste them into their preferred AI assistant (ChatGPT, Claude, or Gemini) to play interactive party games.

**12 Unique Games** covering:
- Movie trivia (Wild Pitch)
- Word puzzles (Missing Link)
- Creative naming (Yes Chef)
- Mystery solving (Crime Scene Chaos)
- Drawing/acting (Sketch the Unsketchable)
- Social voting (Pre-Occupation)

Each game has both a **Family Friendly** and **Adults** version.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4 with MTM brand theme
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Netlify

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── GameCard.jsx
│   ├── FilterBar.jsx
│   ├── HowToPlay.jsx
│   ├── EmailModal.jsx
│   └── FAQ.jsx
├── pages/           # Page components
│   ├── HomePage.jsx
│   ├── GameDetailPage.jsx
│   └── AboutPage.jsx
├── data/            # Game data and prompts
│   ├── games.js
│   └── prompts.js
├── context/         # React context providers
│   └── AuthContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## How It Works

1. User browses games on the homepage
2. User clicks a game to see details
3. User copies the prompt with one click
4. User pastes into their AI assistant of choice
5. AI hosts the game!

## About MTM

Built by [Meet the Moment](https://mtm.now) as a demonstration of practical AI applications. This project showcases:

- **Claude Code** for building the entire web application
- **Multiple AI tools** (ChatGPT, Claude, Gemini) for creating game prompts
- **AI-powered persona testing** for user research

Learn more about AI for nonprofits at [MTM Together](https://together.mtm.now).

---

Built with AI by Meet the Moment
