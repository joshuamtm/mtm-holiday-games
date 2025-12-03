# MTM Holiday Games

AI-powered party games for families, friends, and teams. Copy a prompt, paste into ChatGPT, Claude, or Gemini, and let AI host your holiday game night!

## About

MTM Holiday Games is a festive prompt library website where users copy AI prompts and paste them into their preferred AI assistant (ChatGPT, Claude, or Gemini) to play interactive party games. Perfect for holiday gatherings, family reunions, and virtual celebrations.

### 17 Unique Games

| Game | Description |
|------|-------------|
| **Wild Pitch** | Pitch absurd movies to an AI studio executive |
| **Missing Link** | Connect words through clever associations |
| **Yes Chef** | Name dishes that sound delicious (or disastrous) |
| **Crime Scene Chaos** | Solve wacky mysteries with ridiculous alibis |
| **Sketch the Unsketchable** | Draw and guess impossible concepts |
| **Pre-Occupation** | Vote on who in your group fits funny scenarios |
| **Alibi** | Create and defend alibis under AI interrogation |
| **Hot Take Tribunal** | Defend absurd opinions in a mock court (Adults only) |

#### Kid-Powered Games (Kids Run the Show!)
| Game | Description |
|------|-------------|
| **Kids Win** | Riddles that reward simple thinking — kids beat adults! |
| **Monster Under the Bed** | Kids decide if adults survive silly monster attacks |
| **Grown-Up Translator** | Kids explain jargon like "collateralized debt obligation" |

Most games have both a **Family Friendly** and **Adults** version (17 total). Plus 3 special "Kid-Powered" games where kids run the show! Adults versions feature mature humor (dating disasters, work stress, existential moments) but nothing explicit.

## Features

- **One-Click Copy**: Copy game prompts instantly to your clipboard
- **Works with Any AI**: ChatGPT, Claude, or Gemini all work great
- **Holiday Theme**: Festive design with snowfall animation and seasonal colors
- **Mobile Friendly**: Play on phones and tablets
- **Email Unlock**: One free game available; unlock all 17 with email signup
- **Special Access Link**: Share ungated access with `?access=mtm-holiday-2025`
- **Playtest-Informed**: Tips and optimal player counts based on real user testing

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4 with custom holiday theme
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Netlify (auto-deploy from GitHub)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx       # Navigation with festive accent bar
│   ├── Footer.jsx       # Pine green footer with holiday messaging
│   ├── GameCard.jsx     # Game preview cards with festive styling
│   ├── FilterBar.jsx    # Filter games by audience, mode, location
│   ├── HowToPlay.jsx    # Step-by-step instructions
│   ├── EmailModal.jsx   # Email signup for unlocking games
│   └── FAQ.jsx          # Frequently asked questions
├── pages/
│   ├── HomePage.jsx     # Game listing with snowfall hero
│   ├── GameDetailPage.jsx # Individual game view with prompt
│   └── AboutPage.jsx    # About MTM and project background
├── data/
│   ├── games.js         # Game metadata (17 games)
│   └── prompts.js       # Full AI prompts for each game
├── context/
│   └── AuthContext.jsx  # Unlock state and special access handling
├── App.jsx              # Router configuration
├── main.jsx             # React entry point
└── index.css            # Holiday color theme and animations
```

## How It Works

1. **Browse** games on the homepage (filter by audience, mode, or location)
2. **Click** a game to see details and the full prompt
3. **Copy** the prompt with one click
4. **Paste** into ChatGPT, Claude, or Gemini
5. **Play!** The AI hosts your game automatically

## Access Control

- **Free Game**: Wild Pitch (Adults) is always accessible
- **Email Unlock**: Enter email to unlock all 17 games (stored in localStorage)
- **Special Access**: Add `?access=mtm-holiday-2025` to any URL for instant unlock

## Holiday Theme

The site features a festive holiday design including:
- Animated snowfall in the hero section
- Red, green, and gold color accents
- Pine green footer with seasonal messaging
- Gold shimmer effects on buttons
- Decorative snowflakes and sparkle icons

## About MTM

Built by [Meet the Moment](https://mtm.now) as a demonstration of practical AI applications for the MTM Together community. This project showcases:

- **Claude Code** for building the entire web application
- **Multiple AI tools** (ChatGPT, Claude, Gemini) for creating and testing game prompts
- **AI-powered persona testing** for user research and playtest feedback
- **Prompt engineering** for creating engaging, replayable game experiences

Learn more about AI for nonprofits at [MTM Together](https://together.mtm.now).

## License

Proprietary - Meet the Moment

---

Built with AI by [Meet the Moment](https://mtm.now)
