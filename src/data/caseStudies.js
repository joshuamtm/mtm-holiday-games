export const caseStudies = [
  {
    id: "elevator-entanglement",
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
