export const caseStudies = [
  {
    id: "my-category-overconfidence",
    type: "trivia",
    title: "The Overconfidence Chronicles",
    game: "My Category",
    gameSlug: "my-category",
    tagline: "11 players picked their own expert topics. One person scored. The AI host had no mercy.",
    players: 11,
    duration: "~30 minutes",
    playerNames: ["Alicia", "Martin", "Ruarru", "Monty", "Jacqueline", "Thomas", "Julia", "Ignatius", "Dan", "Ellen", "Jessica"],
    ageRange: "Adults",

    // Trivia format
    finalScore: {
      leader: "Alicia",
      leaderPoints: 3,
      totalPlayers: 11,
      playersWhoScored: 4
    },

    setup: "Eleven players each chose their own 'expert' category—the topic they knew best. The AI host, 'The Spotlight,' served up questions with theatrical flair. The results were humbling.",

    // Highlight rounds
    highlights: [
      {
        player: "Alicia",
        category: "US Human Resources practices",
        difficulty: "Hard",
        question: "The 'duties test' for administrative exemption from overtime—what's the second requirement?",
        answer: "Exercise of discretion and independent judgment",
        result: "CORRECT",
        moment: "Alicia opened with a power move—Hard difficulty on a technical HR question—and nailed it. Set the bar impossibly high."
      },
      {
        player: "Martin",
        category: "Mets baseball",
        difficulty: "Hard",
        question: "What was historically unique about the June 12, 1999 Yankees-Mets game involving a grand slam?",
        answer: "Robin Ventura and John Olerud hit back-to-back grand slams—first time ever by consecutive batters",
        result: "GAVE UP",
        moment: "A true Mets fan meets a deep-cut question. The host's commentary: 'Not the Empire State Building. Not the Burj Khalifa. A LIBRARY.'"
      },
      {
        player: "Ruarru",
        category: "Micro-aggressions among bros in Queens over 40",
        difficulty: "Easy",
        question: "(Pivoted to) What Queens neighborhood did A Tribe Called Quest put on the map?",
        answer: "St. Albans / Jamaica, Queens",
        result: "WRONG (said Hollis)",
        moment: "Started with possibly the most specific category ever attempted. The host had to negotiate: 'This feels less like trivia and more like a sociology dissertation.'"
      },
      {
        player: "Monty",
        category: "Numbers from 1-3",
        difficulty: "Easy",
        question: "What number comes between 1 and 3?",
        answer: "2",
        result: "CORRECT",
        moment: "The strategic genius play. While others crashed on hard questions about their expertise, Monty simply asked: 'What number comes between 1 and 3?' The host lost it: 'Confetti rains from the ceiling! A single tear rolls down my metaphorical cheek!'"
      },
      {
        player: "Ignatius",
        category: "Pokémon Gen 8",
        difficulty: "Hard",
        question: "What are the names of the two ancient heroes who wielded Zacian and Zamazenta?",
        answer: "Sordward and Shielbert (the ridiculous hair brothers)",
        result: "GAVE UP",
        moment: "A true Pokémon fan stumped by deep Galar lore. The host's bonus fact about the brothers' meme-worthy hair softened the blow."
      }
    ],

    // The lesson
    theLesson: "The game revealed something fascinating: expertise is often shallower than we think. Players confidently chose 'Hard' on their best topics—and discovered the difference between 'knowing a lot' and 'knowing the deep cuts.'",

    successFactors: [
      "The host treated every wrong answer with theatrical sympathy, not mockery",
      "Bonus facts after each question turned losses into learning moments",
      "The Monty Strategy (numbers 1-3) became an instant legend and inside joke",
      "Category negotiations (like Ruarru's pivot) showed the AI adapting to players",
      "The scoreboard format created natural drama as confident picks failed",
      "Even 'expert' categories produced surprising knowledge gaps"
    ],

    feedback: "The session became a comedy of confidence. Players learned that 'my category' doesn't mean 'easy points'—it means 'harder questions I should theoretically know.'",

    highlightQuote: "You've watched your competitors struggle with Mets history and Queens hip-hop deep cuts, and you said, 'You know what? I'm going to keep it simple.' This is either the most brilliant move in My Category history... or a trap I'm walking right into.",

    keyLesson: "The genius of My Category is that it flips the script on expertise. Being 'the expert' raises expectations—both the AI's and your own. Sometimes the smartest play is Monty's play: numbers 1-3, easy, confidence secured."
  },
  {
    id: "kids-win-ignatius",
    type: "competition",
    title: "The Ignatius Express",
    game: "Kids Win",
    gameSlug: "kids-win",
    tagline: "Four kids demolished a 'mysterious horde of crotchety adults' 10-4. Overthinking was the real enemy.",
    players: "4 kids vs many adults",
    duration: "~20 minutes",
    playerNames: ["Ignatius", "Martin", "Thomas", "Monty"],
    ageRange: "Kids vs Adults",

    // Competition format
    finalScore: {
      kids: 10,
      adults: 4
    },

    // The setup
    setup: "Four kids—Ignatius, Martin, Thomas, and Monty—faced off against 'a mysterious horde of old, crotchety overthinkers.' The AI host warned the adults: 'These riddles are designed to punish your big, fancy, overthinking brains.'",

    // Key moments
    highlights: [
      {
        riddle: "How many months have 28 days?",
        winner: "Kids",
        answer: "12 (all of them!)",
        moment: "Adults went straight to 'February!' while the kids just... answered the question. All months have at least 28 days."
      },
      {
        riddle: "If you have a bowl with six apples and you take away four, how many apples do you have?",
        winner: "Kids",
        answer: "Four",
        moment: "Adults tried to do subtraction (6-4=2). Kids heard 'you TAKE four' and said 'you HAVE four.' Simple."
      },
      {
        riddle: "What building has the most stories?",
        winner: "Kids (Martin)",
        answer: "A library",
        moment: "Adults were calculating skyscraper heights. Martin just heard 'stories' and thought of books."
      },
      {
        riddle: "What can you hold in your right hand but NEVER in your left hand?",
        winner: "Kids (Thomas)",
        answer: "Your left hand",
        moment: "Thomas's clutch answer at match point. Go ahead, try holding your left hand IN your left hand."
      }
    ],

    // MVP breakdown
    mvpBreakdown: [
      { name: "Ignatius", title: "The Machine", description: "Four or five answers, instant reflexes, zero hesitation. Answered 'towel' before the riddle finished echoing." },
      { name: "Martin", title: "Clutch Performer", description: "Opened with 'library,' closed with 'air.' Perfect timing." },
      { name: "Thomas", title: "Left Hand Genius", description: "Emerged at match point with the perfect answer." },
      { name: "Monty", title: "Silent Strategist", description: "The moral support king." }
    ],

    // What made it work
    successFactors: [
      "The framing explicitly told kids to 'trust your first instinct' while warning adults about overthinking",
      "Riddles genuinely rewarded literal interpretation over clever reasoning",
      "The AI host celebrated kid victories with escalating enthusiasm ('IGNATIUS IS ON FIRE!')",
      "Adults' failures were narrated with comedic sympathy ('You were calculating the height of the Burj Khalifa, weren't you?')",
      "Each riddle was a complete micro-story with setup, answer, and commentary",
      "The MVP breakdown at the end gave everyone recognition"
    ],

    feedback: "The session proved the game's core thesis: sometimes the smartest thing you can do is stop being so smart.",

    highlightQuote: "Adults, I don't even know what to say to you anymore. You're watching a clinic. This child is absolutely dismantling you and he's not even breaking a sweat.",

    keyLesson: "The game works because it inverts the usual power dynamic. Kids aren't competing despite their age—their literal thinking is their superpower."
  },
  {
    id: "elevator-entanglement",
    type: "mystery",
    title: "The Inexplicable Elevator Entanglement",
    game: "Crime Scene Chaos",
    gameSlug: "crime-scene-chaos-kids",
    tagline: "Seven players, one quantum mystery, and a cat that refused to observe.",
    players: 7,
    duration: "~25 minutes",
    playerNames: ["Ignatius", "Martin", "Thomas", "Monty", "Alicia", "Jacqueline", "Ruarri"],
    ageRange: "Mixed ages (adults and kids)",

    // The case details
    crime: "Residents of the Grandiose Towers luxury apartment building found themselves exiting elevators three hours in the past, creating duplicate residents, paradoxical dogs, and temporal chaos.",

    evidence: [
      "A mysterious new tenant in apartment 33C carrying a briefcase and an empty fishbowl",
      "An antique rotary phone replacing the elevator's emergency phone, with a cord extending impossibly far into the walls",
      "Security footage showing elevator buttons rearranging at 3:33 AM, with Floor 33's button appearing twice",
      "Expert testimony from a quantum physicist identifying a \"paradox loop\" built with technology from the future",
      "The smell of burnt toast and \"nostalgia\" in the elevator",
      "A building cat, Mr. Whiskers, who had stopped aging entirely"
    ],

    solution: {
      perpetrator: "Dr. Samantha Chrodinger-Gurr",
      motive: "A disgraced quantum physicist and devoted fish owner who constructed an \"indecision engine\" to keep her deceased fish, Sir Bubbles the Third, in a state of permanent quantum uncertainty.",
      mechanism: "She weaponized Mr. Whiskers—a cat with \"existential apathy\" incapable of firm observation—as the lynchpin preventing waveform collapse. The temporal side effects on the elevator were unintended collateral damage from the uncertainty field leaking into building infrastructure."
    },

    // The solving journey
    breakthroughs: [
      {
        question: "Do the cat and the empty fish bowl have any connection?",
        insight: "Sharp pattern recognition—identified the two most symbolically loaded elements",
        reveal: "Mr. Whiskers had previously lived in apartment 33C. The fishbowl's water moved \"like it was remembering how to be water.\" The cat had been staring at the apartment door and walking backward."
      },
      {
        question: "Is the tenant known as Schrodinger?",
        insight: "Adults noticed \"Entanglement\" in the case title—a quantum physics term—and combined it with the cat's impossible temporal properties",
        reveal: "The tenant was registered as \"S. Chrödin-Gurr\"—an anagram hiding in plain sight."
      },
      {
        question: "Does the cat not know if the fish is in the bowl or not?",
        insight: "Sophisticated understanding of quantum mechanics as metaphor—the act of observation collapses possibility into certainty",
        reveal: "Mr. Whiskers wasn't just a victim—he was the mechanism. A cat incapable of deciding whether the fish existed was a cat incapable of collapsing the waveform."
      },
      {
        question: "What's in the briefcase? The fish!",
        insight: "Completed the narrative logic with elegant simplicity",
        reveal: "The scientist wasn't building chaos for its own sake—she was preserving a beloved pet in quantum superposition, neither alive nor dead."
      }
    ],

    // What made it work
    successFactors: [
      "The case title contained a hidden clue (\"Entanglement\") that rewarded attentive reading",
      "The mystery had internal logical consistency despite its absurdity",
      "Each player contribution built meaningfully toward the solution",
      "The Detective AI treated every question as valuable, expanding the narrative in response",
      "The resolution felt earned rather than arbitrary—the pieces genuinely fit together",
      "The emotional stakes (a scientist grieving her fish) added unexpected heart to the comedy"
    ],

    feedback: "The group described the experience as \"incredibly fun\" and \"beyond delighted\" at how the mystery played out.",

    // Highlight quote
    highlightQuote: "The combination of absurdist premise, hidden clues, and collaborative deduction created a satisfying gameplay loop where every contribution mattered.",

    // Key lesson
    keyLesson: "The magic came from the intersection of a well-structured prompt, emergent thematic coherence, responsive improvisation that rewarded player questions, and sharp players who caught subtle clues."
  }
];

export function getCaseStudyById(id) {
  return caseStudies.find(study => study.id === id);
}

export function getCaseStudiesByGame(gameSlug) {
  return caseStudies.filter(study => study.gameSlug === gameSlug);
}
