export const games = [
  // ===== KID-POWERED GAMES (Kids Run the Show!) =====
  {
    slug: "kids-win",
    title: "Kids Win",
    subtitle: "Riddles Where Being Little Helps",
    description: "Riddles designed to reward simple, literal thinking. Kids vs Adults - watch the grown-ups overthink while kids nail the obvious answers!",
    age: "kids",
    kidPowered: true,
    modes: ["team-vs-team"],
    location: "remote-ok",
    players: { min: 2, max: 12 },
    optimalPlayers: "4-8",
    duration: "15-30 minutes",
    requirements: [],
    free: false,
    tip: "Adults: resist the urge to overthink! Kids often see the obvious answer adults miss.",
    complexity: 1,
    bestFor: ["family-game-night", "kids-vs-adults"],
    whatToExpect: {
      aiDoes: "Reads riddles aloud and keeps score between Kids and Adults teams",
      playersDo: "Shout out answers - first team to answer correctly wins the point",
      roundLength: "30 seconds per riddle"
    },
    sampleOutput: "Here comes riddle #3!\n\n\"What has hands but can't clap?\"\n\nKids team, Adults team — who knows the answer? 🤔"
  },
  {
    slug: "monster-under-the-bed",
    title: "Monster Under the Bed",
    subtitle: "Kids vs. The Creature",
    description: "Kids control the screen and learn each monster's SECRET WEAKNESS — then watch adults guess blindly! Kids decide: GOBBLED or SURVIVED?",
    age: "kids",
    kidPowered: true,
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 2, max: 8 },
    optimalPlayers: "3-6",
    duration: "20-40 minutes",
    requirements: [],
    free: false,
    tip: "Kids should hold the phone/tablet! Only they see the monster's secret weakness. Adults must look away during the reveal.",
    complexity: 2,
    bestFor: ["kids-in-charge", "family-game-night"],
    whatToExpect: {
      aiDoes: "Creates silly monsters with secret weaknesses that only kids can see",
      playersDo: "Kids read the secret, adults guess how to defeat the monster, kids judge if they survive",
      roundLength: "3-5 minutes per monster"
    },
    sampleOutput: "👀 Adults, look away from the screen!\n\n🧒 Kids only: A monster has been spotted...\n\nIt's THE DUST BUNNY DRAGON! A fluffy gray beast with vacuum cleaner arms!\n\n🤫 SECRET WEAKNESS: It's terrified of vacuum cleaners!\n\nKids, plan your strategy... then call the adults back!"
  },
  {
    slug: "grown-up-translator",
    title: "Grown-Up Translator",
    subtitle: "Kids Explain Adult Stuff",
    description: "Kids explain complicated adult concepts like 'collateralized debt obligation' based on what the words sound like. Adults guess the real term. Kids' explanations are often better than reality!",
    age: "kids",
    kidPowered: true,
    modes: ["multiplayer"],
    location: "remote-ok",
    players: { min: 3, max: 10 },
    optimalPlayers: "4-7",
    duration: "20-40 minutes",
    requirements: [],
    free: false,
    tip: "The magic is in kids' literal interpretations. 'Liquid assets' = wet money? 'Hedge fund' = money for bushes?",
    complexity: 2,
    bestFor: ["kids-in-charge", "creative-play"],
    whatToExpect: {
      aiDoes: "Presents complicated adult terms and asks kids to explain what they think the words mean",
      playersDo: "Kids give creative explanations, adults try to guess the real term, everyone votes on the best explanation",
      roundLength: "3-4 minutes per term"
    },
    sampleOutput: "🤔 Ah, little translator! Help me understand this Earth term:\n\n**FIDUCIARY RESPONSIBILITY**\n\nBased on what these words SOUND like, what do you think this means?"
  },
  // ===== FAMILY FRIENDLY GAMES =====
  {
    slug: "my-category",
    title: "My Category",
    subtitle: "Trivia Where YOU Pick the Topic",
    description: "Finally, trivia about YOUR expertise! Pick any category as specific as you want — 'Minecraft redstone,' '90s sitcom theme songs,' 'my dog' — then choose Easy, Medium, or Hard.",
    age: "kids",
    modes: ["solo-coop", "team-vs-team", "player-vs-player"],
    location: "remote-ok",
    players: { min: 1, max: 10 },
    optimalPlayers: "3-6",
    duration: "15-30 minutes",
    requirements: [],
    free: true,
    tip: "The more specific your category, the more fun! 'History' is boring. 'Weird facts about ancient Roman food' is perfect.",
    complexity: 1,
    bestFor: ["starting-the-party", "all-ages"],
    whatToExpect: {
      aiDoes: "Generates trivia questions in whatever category you choose, tracks scores",
      playersDo: "Pick your own category, choose difficulty, answer questions",
      roundLength: "1-2 minutes per turn"
    },
    sampleOutput: "🎯 Sarah, it's your turn in the spotlight!\n\nYou picked: **Taylor Swift deep cuts** on HARD difficulty.\n\nHere's your question:\nIn 'All Too Well (10 Minute Version)', what specific item does she mention leaving at his sister's house?"
  },
  {
    slug: "wild-pitch-adults",
    title: "Wild Pitch: After Dark",
    subtitle: "Movie Trivia Gone Wrong",
    description: "A washed-up Hollywood pitch man describes famous movies with technical accuracy and zero shame. Guess the film before your dignity runs out.",
    age: "adults",
    modes: ["solo-coop", "team-vs-team"],
    location: "remote-ok",
    players: { min: 1, max: 10 },
    optimalPlayers: "4-8",
    duration: "15-30 minutes",
    requirements: [],
    free: false,
    tip: "Perfect opener for game night! Works great with mixed ages - older kids can play too.",
    complexity: 1,
    bestFor: ["starting-the-party", "movie-lovers"],
    whatToExpect: {
      aiDoes: "Describes movies in ridiculous but technically accurate ways, tracks strikes and scores",
      playersDo: "Guess the movie, ask for hints (costs a strike), try not to strike out",
      roundLength: "1-2 minutes per movie"
    },
    sampleOutput: "⚾ Alright, here's your pitch:\n\n\"A man with commitment issues keeps reliving the same day until he finally becomes a decent person. Groundbreaking journalism ensues.\"\n\n30 seconds on the clock. What's your guess?"
  },
  {
    slug: "wild-pitch-kids",
    title: "Wild Pitch Kids",
    subtitle: "Family Movie Mayhem",
    description: "An enthusiastic retired film critic describes famous movies in the silliest way possible. Can your family guess the film?",
    age: "kids",
    modes: ["solo-coop", "team-vs-team"],
    location: "remote-ok",
    players: { min: 1, max: 10 },
    optimalPlayers: "4-8",
    duration: "15-30 minutes",
    requirements: [],
    free: true,
    tip: "Great for family movie buffs! Quick rounds keep everyone engaged.",
    complexity: 1,
    bestFor: ["starting-the-party", "all-ages"],
    whatToExpect: {
      aiDoes: "Describes family movies in silly but accurate ways, keeps score, gives hints",
      playersDo: "Guess the movie as a family, ask for hints if stuck",
      roundLength: "1-2 minutes per movie"
    },
    sampleOutput: "🎬 Ooh, here's a fun one!\n\n\"A group of toys have an existential crisis every time their owner leaves the room. They're fine. Everything's fine.\"\n\nWhat movie is it? You have 30 seconds!"
  },
  {
    slug: "pre-occupation-kids",
    title: "Pre-Occupation",
    subtitle: "The Job Voting Game",
    description: "Vote on which of your friends would be perfect for weird and wonderful jobs. From Ostrich Babysitter to Professional Line-Stander!",
    age: "kids",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 3, max: 8 },
    optimalPlayers: "4-6",
    duration: "20-40 minutes",
    requirements: ["Paper and pens for voting"],
    free: false,
    tip: "The voting creates great moments! Encourage players to campaign for each other.",
    complexity: 2,
    bestFor: ["getting-to-know-you", "family-game-night"],
    whatToExpect: {
      aiDoes: "Presents weird jobs, runs voting rounds, awards points",
      playersDo: "Discuss and campaign, write votes on paper, reveal together",
      roundLength: "3-5 minutes per job"
    },
    sampleOutput: "📋 Round 3! The job is:\n\n**PROFESSIONAL PILLOW FLUFFER**\n\nWho among you would be the BEST at this crucial occupation? Discuss! You have 2 minutes to campaign for your friends."
  },
  {
    slug: "pre-occupation-adults",
    title: "Pre-Occupation: After Dark",
    subtitle: "Awkward Career Counseling",
    description: "Vote on which of your friends would excel at history's most unfortunate jobs. From Groom of the Stool to OnlyFans Tax Accountant.",
    age: "adults",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 3, max: 8 },
    optimalPlayers: "4-6",
    duration: "20-40 minutes",
    requirements: ["Paper and pens for voting"],
    free: false,
    tip: "Best 'getting to know you' game - perfect for friend groups who think they know each other!",
    complexity: 2,
    bestFor: ["getting-to-know-you", "late-night"],
    whatToExpect: {
      aiDoes: "Presents awkward/unfortunate jobs, runs voting, tracks Occupation Cards",
      playersDo: "Campaign for friends, vote on paper, defend your choices",
      roundLength: "3-5 minutes per job"
    },
    sampleOutput: "📋 This round's occupation:\n\n**COUPLES' ARGUMENT MEDIATOR (LIVE-IN)**\n\nYou'd move into their apartment and professionally intervene in disputes about dishes, thermostat settings, and who said what.\n\nWho's perfect for this? Discuss!"
  },
  {
    slug: "missing-link",
    title: "Missing Link",
    subtitle: "The Connection Game",
    description: "Find the word that connects three seemingly unrelated words. PINE, SAUCE, CRAB = APPLE (pineapple, applesauce, crab apple)!",
    age: "kids",
    modes: ["solo-coop", "team-vs-team", "player-vs-player"],
    location: "remote-ok",
    players: { min: 1, max: 10 },
    optimalPlayers: "4-8",
    duration: "15-30 minutes",
    requirements: [],
    free: true,
    tip: "Quick rounds keep everyone engaged. Some puzzles may require adult knowledge - perfect for mixed teams!",
    complexity: 1,
    bestFor: ["starting-the-party", "brain-teasers"],
    whatToExpect: {
      aiDoes: "Presents three words with a hidden connection, gives hints, tracks scores",
      playersDo: "Find the one word that connects all three, ask for hints if stuck",
      roundLength: "1-2 minutes per puzzle"
    },
    sampleOutput: "🔗 Here's your puzzle:\n\n**PINE    SAUCE    CRAB**\n\nWhat ONE word connects all three? 🤔"
  },
  {
    slug: "yes-chef-kids",
    title: "Yes Chef",
    subtitle: "Ridiculous Recipe Naming",
    description: "Name absurd recipes mixing real ingredients with impossible ones. What do you call a dish with flour, eggs, and unicorn tears?",
    age: "kids",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 3, max: 8 },
    optimalPlayers: "3-6",
    duration: "20-40 minutes",
    requirements: ["Paper and pens for writing recipe names"],
    free: false,
    tip: "Keep groups smaller (3-6) for faster rounds. Great creative energy but can take time with big groups!",
    complexity: 2,
    bestFor: ["creative-play", "family-game-night"],
    whatToExpect: {
      aiDoes: "Generates silly recipes with magical ingredients, one player reads as Head Chef",
      playersDo: "Write creative names for the dish, Head Chef picks the winner",
      roundLength: "3-4 minutes per recipe"
    },
    sampleOutput: "👨‍🍳 Chef Emma, your creation awaits!\n\n**INGREDIENTS:**\n- 2 cups rainbow sprinkles\n- 1 tablespoon dragon sneeze\n- A handful of cloud fluff\n- 3 giggles (freshly harvested)\n\n**INSTRUCTIONS:**\n1. Whisper sweet nothings to the sprinkles\n2. Fold in the dragon sneeze (careful, it's spicy!)\n\nKitchen Staff: Write your best name for this dish!"
  },
  {
    slug: "yes-chef-adults",
    title: "Yes Chef: After Dark",
    subtitle: "Existential Recipe Naming",
    description: "Name recipes mixing real ingredients with existential dread. What do you call a dish with flour, eggs, and your therapist's knowing silence?",
    age: "adults",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 3, max: 8 },
    optimalPlayers: "3-6",
    duration: "20-40 minutes",
    requirements: ["Paper and pens for writing recipe names"],
    free: false,
    tip: "Pairs well with whatever's left in the bottle. Keep groups smaller for faster rounds!",
    complexity: 2,
    bestFor: ["creative-play", "late-night"],
    whatToExpect: {
      aiDoes: "Generates recipes mixing real ingredients with existential concepts",
      playersDo: "Write creative/funny names for the dish, Head Chef picks the winner",
      roundLength: "3-4 minutes per recipe"
    },
    sampleOutput: "👨‍🍳 Chef Marcus, your creation awaits!\n\n**INGREDIENTS:**\n- 1 cup regret (aged 10 years)\n- 2 tbsp your ex's apology\n- A dash of Sunday scaries\n- The exact tone of voice your mom uses when she says \"fine\"\n\n**INSTRUCTIONS:**\n1. Marinate in self-doubt overnight\n2. Serve cold, like your last relationship\n\nKitchen Staff: Name this masterpiece!"
  },
  {
    slug: "crime-scene-chaos-kids",
    title: "Crime Scene Chaos",
    subtitle: "Ridiculous Mystery Solving",
    description: "Solve absurd crimes like The Great Left Sock Conspiracy and The Midnight Banana Heist. Elementary, my dear detective!",
    age: "kids",
    modes: ["solo-coop", "team-vs-team", "player-vs-player"],
    location: "remote-ok",
    players: { min: 2, max: 8 },
    optimalPlayers: "3-6",
    duration: "20-40 minutes",
    requirements: [],
    free: false,
    tip: "Kids LOVE this one! The absurd premises let wild guesses shine. Cooperative mode keeps everyone engaged.",
    complexity: 2,
    bestFor: ["brain-teasers", "family-game-night"],
    whatToExpect: {
      aiDoes: "Presents silly crimes with clues, guides investigation, judges solutions",
      playersDo: "Examine evidence, discuss theories, present your solution to the crime",
      roundLength: "5-10 minutes per case"
    },
    sampleOutput: "🔍 CASE FILE: The Midnight Banana Heist\n\nExactly 47 bananas disappeared from 12 different stores at exactly 2:47 AM.\n\n**EVIDENCE FOUND:**\n1. Yellow pajama footprints\n2. A note that just says \"Potassium.\"\n3. Every store's security camera shows static at the same moment\n\nDetectives, what's your theory?"
  },
  {
    slug: "crime-scene-chaos-adults",
    title: "Crime Scene Chaos: After Dark",
    subtitle: "Uncomfortably Relatable Mysteries",
    description: "Solve crimes like The Unreturned Text, The Meeting That Could Have Been An Email, and The Birthday Party That Never Was.",
    age: "adults",
    modes: ["solo-coop", "team-vs-team", "player-vs-player"],
    location: "remote-ok",
    players: { min: 2, max: 8 },
    optimalPlayers: "3-6",
    duration: "20-40 minutes",
    requirements: [],
    free: false,
    tip: "Warning: cases may hit uncomfortably close to home. That's the point.",
    complexity: 2,
    bestFor: ["brain-teasers", "late-night"],
    whatToExpect: {
      aiDoes: "Presents relatable adult crimes with evidence, guides investigation",
      playersDo: "Examine clues, discuss theories, present your (probably too personal) solution",
      roundLength: "5-10 minutes per case"
    },
    sampleOutput: "🔍 CASE FILE: The Birthday Party That Never Was\n\n47 people RSVPed \"Going.\" Zero showed up.\n\n**EVIDENCE:**\n1. 12 texts saying \"I'll definitely be there!\"\n2. 7 canceled Uber rides within a 2-block radius\n3. A perfectly good cake, untouched\n4. 23 Instagram stories from \"a different thing\"\n\nWhat really happened here, detectives?"
  },
  {
    slug: "sketch-the-unsketchable-kids",
    title: "Sketch the Unsketchable",
    subtitle: "Drawing the Impossible",
    description: "Draw or act out impossible concepts like 'the sound of yellow' or 'what blue sounds like when it's nervous.'",
    age: "kids",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 3, max: 8 },
    optimalPlayers: "4-6",
    duration: "20-40 minutes",
    requirements: ["Paper and pens OR space for charades"],
    free: false,
    tip: "Choose drawing OR acting for each concept - non-artists can act it out instead!",
    complexity: 2,
    bestFor: ["creative-play", "family-game-night"],
    whatToExpect: {
      aiDoes: "Gives impossible concepts to draw or act out, tracks time and scores",
      playersDo: "Choose to draw on paper OR act it out, others guess what concept you're showing",
      roundLength: "2-3 minutes per concept"
    },
    sampleOutput: "🎨 Emma, will you DRAW or ACT?\n\n...\n\nOkay, you chose to DRAW! Here's your concept:\n\n**\"The sound of yellow\"**\n\nYou have 2 minutes. Everyone else — start guessing!"
  },
  {
    slug: "sketch-the-unsketchable-adults",
    title: "Sketch the Unsketchable: After Dark",
    subtitle: "Drawing Existential Dread",
    description: "Draw or act out concepts like 'the specific type of tired that sleep doesn't fix' and 'being left on read.'",
    age: "adults",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 3, max: 8 },
    optimalPlayers: "4-6",
    duration: "20-40 minutes",
    requirements: ["Paper and pens OR space for charades"],
    free: false,
    tip: "Creative types thrive here! Acting option means non-artists can still shine.",
    complexity: 2,
    bestFor: ["creative-play", "late-night"],
    whatToExpect: {
      aiDoes: "Gives existentially relatable concepts to draw or act out, tracks scores",
      playersDo: "Choose to draw on paper OR act it out, others guess the concept",
      roundLength: "2-3 minutes per concept"
    },
    sampleOutput: "🎨 Marcus, will you DRAW or ACT?\n\n...\n\nOkay, you chose to ACT! Here's your concept:\n\n**\"The specific type of tired that sleep doesn't fix\"**\n\nYou have 2 minutes. Everyone else — start guessing!"
  },
  {
    slug: "alibi-kids",
    title: "Alibi",
    subtitle: "The Story-Matching Game",
    description: "Two suspects claim they were together when the cookies disappeared. Can they keep their stories straight under interrogation?",
    age: "kids",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 4, max: 8 },
    optimalPlayers: "5-7",
    duration: "20-40 minutes",
    requirements: [],
    free: false,
    tip: "The more detailed the alibi, the harder it is to remember! Watch for the little details that don't match.",
    complexity: 3,
    bestFor: ["family-game-night", "brain-teasers"],
    whatToExpect: {
      aiDoes: "Announces the crime, interrogates each suspect separately, summarizes inconsistencies",
      playersDo: "Two suspects create an alibi together, then get questioned separately while the jury listens for lies",
      roundLength: "5-8 minutes per round"
    },
    sampleOutput: "🚨 THE CRIME: Someone ate ALL the cookies at exactly 3:47 PM!\n\nSuspects Emma and Jake claim they were \"at the park\" together.\n\n👀 Suspects: You have 2 minutes to get your story straight!\n\nJury: Listen carefully — you'll vote INNOCENT or GUILTY based on whether their stories match!"
  },
  {
    slug: "alibi-adults",
    title: "Alibi: After Dark",
    subtitle: "Where Were You Last Night?",
    description: "Two suspects claim they were together when someone ate the labeled leftovers. The AI detective will interrogate them separately. Will their stories hold up?",
    age: "adults",
    modes: ["multiplayer"],
    location: "same-room",
    players: { min: 4, max: 8 },
    optimalPlayers: "5-7",
    duration: "20-40 minutes",
    requirements: [],
    free: false,
    tip: "The best alibis have specific details — but specific details are the easiest to mess up!",
    complexity: 3,
    bestFor: ["late-night", "brain-teasers"],
    whatToExpect: {
      aiDoes: "Announces the crime, interrogates suspects separately with probing questions",
      playersDo: "Create an alibi together, then get grilled separately while the jury catches inconsistencies",
      roundLength: "5-8 minutes per round"
    },
    sampleOutput: "🚨 THE INCIDENT: Someone ate the labeled leftovers.\n\nYou know, the ones that clearly said \"SARAH'S - DO NOT EAT.\"\n\nSuspects Lisa and Marcus claim they were \"at a quiet bar\" together.\n\n👀 Suspects: 2 minutes to align your stories.\n\nJury: Pay attention — little details are where alibis fall apart!"
  },
  {
    slug: "hot-take-tribunal",
    title: "Hot Take Tribunal: After Dark",
    subtitle: "Defend the Indefensible",
    description: "Passionately argue that cereal is a soup, that the DMV is actually pleasant, or that the snooze button is self-care. The jury decides if you're convincing.",
    age: "adults",
    modes: ["multiplayer"],
    location: "remote-ok",
    players: { min: 4, max: 8 },
    optimalPlayers: "5-6",
    duration: "20-40 minutes",
    requirements: [],
    free: false,
    tip: "Commit fully to your assigned position — the more confident you sound, the more convincing you'll be!",
    complexity: 2,
    bestFor: ["late-night", "debate-lovers"],
    whatToExpect: {
      aiDoes: "Assigns ridiculous opinions to defend, runs the court proceedings, tallies jury votes",
      playersDo: "Passionately argue your assigned position, jury votes on who's most convincing",
      roundLength: "3-5 minutes per case"
    },
    sampleOutput: "⚖️ ALL RISE! The Hot Take Tribunal is now in session.\n\nSarah, you must defend this position:\n\n**\"Naps should be mandatory and government-funded.\"**\n\nYou have 60 seconds to make your case. The jury will decide if you're convincing!\n\n...BEGIN!"
  }
];

export const modeLabels = {
  "solo-coop": "Play Solo or Together",
  "team-vs-team": "Team vs Team",
  "player-vs-player": "Face Off",
  "multiplayer": "Group Game"
};

export const modeDescriptions = {
  "solo-coop": "You or your team plays against the AI",
  "team-vs-team": "Split into teams and compete against each other",
  "player-vs-player": "Individual players compete head-to-head",
  "multiplayer": "Everyone plays together with rotating roles"
};

export const locationLabels = {
  "remote-ok": "Remote OK",
  "same-room": "Same Room"
};

export const ageLabels = {
  "kids": "Family Friendly",
  "adults": "Adults"
};

export const bestForLabels = {
  "starting-the-party": "Starting the Party",
  "getting-to-know-you": "Getting to Know You",
  "kids-in-charge": "Kids Run the Show",
  "kids-vs-adults": "Kids vs Adults",
  "late-night": "Late Night Energy",
  "family-game-night": "Family Game Night",
  "creative-play": "Creative & Silly",
  "brain-teasers": "Brain Teasers",
  "movie-lovers": "Movie Lovers",
  "all-ages": "All Ages",
  "debate-lovers": "Debate Lovers"
};

export const complexityLabels = {
  1: "Easy to Learn",
  2: "Some Setup",
  3: "More Involved"
};

export function getGameBySlug(slug) {
  return games.find(game => game.slug === slug);
}

export function getGamesByBestFor(category) {
  return games.filter(game => game.bestFor && game.bestFor.includes(category));
}
