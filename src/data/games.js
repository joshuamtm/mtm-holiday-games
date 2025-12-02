export const games = [
  {
    slug: "wild-pitch-adults",
    title: "Wild Pitch",
    subtitle: "Movie Trivia Gone Wrong",
    description: "A washed-up Hollywood pitch man describes famous movies with technical accuracy and zero shame. Guess the film before your dignity runs out.",
    age: "adults",
    modes: ["solo-coop", "team-vs-team"],
    location: "remote-ok",
    players: { min: 1, max: 10 },
    optimalPlayers: "4-8",
    duration: "15-30 minutes",
    requirements: [],
    free: true,
    tip: "Perfect opener for game night! Works great with mixed ages - older kids can play too."
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
    free: false,
    tip: "Great for family movie buffs! Quick rounds keep everyone engaged."
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
    tip: "The voting creates great moments! Encourage players to campaign for each other."
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
    tip: "Best 'getting to know you' game - perfect for friend groups who think they know each other!"
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
    free: false,
    tip: "Quick rounds keep everyone engaged. Some puzzles may require adult knowledge - perfect for mixed teams!"
  },
  {
    slug: "kids-win",
    title: "Kids Win",
    subtitle: "Riddles Where Being Little Helps",
    description: "Riddles designed to reward simple, literal thinking. Kids vs Adults - do children really think differently?",
    age: "kids",
    modes: ["team-vs-team"],
    location: "remote-ok",
    players: { min: 2, max: 12 },
    optimalPlayers: "4-8",
    duration: "15-30 minutes",
    requirements: [],
    free: false,
    tip: "Adults: resist the urge to overthink! Kids often see the obvious answer adults miss."
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
    tip: "Keep groups smaller (3-6) for faster rounds. Great creative energy but can take time with big groups!"
  },
  {
    slug: "yes-chef-adults",
    title: "Yes Chef: After Hours",
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
    tip: "Pairs well with whatever's left in the bottle. Keep groups smaller for faster rounds!"
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
    tip: "Kids LOVE this one! The absurd premises let wild guesses shine. Cooperative mode keeps everyone engaged."
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
    tip: "Warning: cases may hit uncomfortably close to home. That's the point."
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
    tip: "Choose drawing OR acting for each concept - non-artists can act it out instead!"
  },
  {
    slug: "sketch-the-unsketchable-adults",
    title: "Sketch the Unsketchable: After Hours",
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
    tip: "Creative types thrive here! Acting option means non-artists can still shine."
  }
];

export const modeLabels = {
  "solo-coop": "Solo/Co-op",
  "team-vs-team": "Team vs Team",
  "player-vs-player": "Player vs Player",
  "multiplayer": "Multiplayer"
};

export const locationLabels = {
  "remote-ok": "Remote OK",
  "same-room": "Same Room"
};

export const ageLabels = {
  "kids": "Family Friendly",
  "adults": "Adults"
};

export function getGameBySlug(slug) {
  return games.find(game => game.slug === slug);
}
