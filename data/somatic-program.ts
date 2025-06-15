export interface SomaticStep {
  title: string
  description: string
  instructions?: string[]
  affirmation?: string
  visualization?: string
  duration?: string
  archetypeVariation?: Record<
    string,
    {
      instructions?: string[]
      affirmation?: string
      visualization?: string
    }
  >
}

export interface SomaticSession {
  title: string
  duration: string
  steps: SomaticStep[]
}

export interface SomaticDay {
  theme: string
  focus: string
  element: string
  week: number
  masteryLevel: "foundation" | "activation" | "integration" | "mastery" | "transcendence"
  sessions: {
    morning: SomaticSession
    midday: SomaticSession
    evening: SomaticSession
  }
  archetypeMissions: Record<string, string[]>
  quantumUpgrade?: string
}

// Generate complete 60-day program
export const SOMATIC_PROGRAM: SomaticDay[] = []

// WEEK 1-2: FOUNDATION PHASE
for (let day = 1; day <= 14; day++) {
  const week = Math.ceil(day / 7)
  const elements = ["Earth", "Air", "Fire", "Water", "Ether", "Light", "Sound"]
  const element = elements[(day - 1) % elements.length]

  SOMATIC_PROGRAM.push({
    theme: `Foundation Day ${day}: ${element} Mastery`,
    focus: `Building consciousness foundation through ${element.toLowerCase()} element integration`,
    element,
    week,
    masteryLevel: "foundation",
    sessions: {
      morning: {
        title: `${element} Foundation Awakening`,
        duration: `${8 + Math.floor(day / 3)} minutes`,
        steps: [
          {
            title: `${element} Element Connection`,
            description: `Connect deeply with the ${element.toLowerCase()} element within and around you.`,
            instructions: [
              `Feel the ${element.toLowerCase()} element in your body and environment`,
              "Breathe this elemental energy throughout your entire being",
              "Set intention for embodying this quality today",
              "Feel this element awakening in your cells",
            ],
            affirmation: `I am one with the ${element.toLowerCase()} element, embodying its highest qualities`,
            archetypeVariation: {
              visionary: {
                affirmation: `I am a ${element} visionary, seeing infinite possibilities through this elemental lens`,
                visualization: `Your visionary sight enhanced by ${element} energy, seeing futures others cannot perceive`,
              },
              creator: {
                affirmation: `I am a ${element} creator, manifesting beauty through this elemental power`,
                visualization: `${element} energy flowing through your creative expression, making your art transcendent`,
              },
              warrior: {
                affirmation: `I am a ${element} warrior, wielding this elemental force for justice and truth`,
                visualization: `${element} power flowing through your warrior spirit, making you unstoppable`,
              },
              mystic: {
                affirmation: `I am a ${element} mystic, one with the divine essence of this element`,
                visualization: `Your consciousness merging with the cosmic ${element} energy, becoming one with all`,
              },
            },
          },
          {
            title: "Foundation Building Practice",
            description: "Build a solid foundation with this elemental energy.",
            instructions: [
              "Ground yourself in this elemental quality",
              "Feel it becoming part of your core identity",
              "Practice embodying this energy in your daily life",
              "Set intention to master this element",
            ],
            visualization: `Your entire being radiating ${element} energy at the foundation level`,
          },
        ],
      },
      midday: {
        title: `${element} Recalibration`,
        duration: "3 minutes",
        steps: [
          {
            title: "Foundation Element Check-In",
            description: `Maintain foundation-level connection with ${element} energy.`,
            instructions: [
              `Assess your current connection to ${element} energy`,
              "Realign with this elemental quality",
              "Recommit to embodying this energy",
            ],
            affirmation: `I maintain perfect ${element} foundation throughout my day`,
          },
        ],
      },
      evening: {
        title: `${element} Integration`,
        duration: `${9 + Math.floor(day / 2)} minutes`,
        steps: [
          {
            title: `${element} Foundation Integration`,
            description: `Integrate today's ${element} work at the cellular level.`,
            instructions: [
              `Review how you embodied ${element} energy today`,
              "Notice how this element supported your growth",
              "Appreciate all the ways you embodied this energy",
            ],
            visualization: `${element} energy integrating into your DNA, becoming part of your essential nature`,
          },
          {
            title: "Foundation Evolution Preparation",
            description: "Prepare for tomorrow's continued foundation building.",
            instructions: [
              `Thank your body for being a vessel of ${element} consciousness`,
              "Release any tension or holding from the day",
              "Set intention for continued foundation evolution during sleep",
            ],
            affirmation: `I evolve effortlessly, my ${element} foundation deepens with each day`,
          },
        ],
      },
    },
    archetypeMissions: {
      visionary: [
        `Use ${element} energy to enhance your visionary abilities`,
        `Practice seeing the future through ${element} awareness`,
        `Apply ${element} wisdom to a current life challenge`,
      ],
      creator: [
        `Create something beautiful using ${element} energy as inspiration`,
        `Infuse a creative project with ${element} consciousness`,
        `Use ${element} energy to breakthrough a creative block`,
      ],
      warrior: [
        `Use ${element} energy to overcome a significant challenge`,
        `Apply ${element} warrior energy to a personal goal`,
        `Defend someone using ${element} warrior strength`,
      ],
      mystic: [
        `Deepen your spiritual practice through ${element} meditation`,
        `Use ${element} consciousness to heal an aspect of yourself`,
        `Connect with the divine through ${element} communion`,
      ],
    },
    ...(day % 7 === 0 ? { quantumUpgrade: `Week ${week} Foundation Complete - Activation Protocols Unlocked` } : {}),
  })
}

// WEEK 3-4: ACTIVATION PHASE
for (let day = 15; day <= 28; day++) {
  const week = Math.ceil(day / 7)
  const elements = ["Water", "Fire", "Air", "Earth", "Ether", "Light", "Sound", "Love"]
  const element = elements[(day - 15) % elements.length]

  SOMATIC_PROGRAM.push({
    theme: `Activation Day ${day}: ${element} Awakening`,
    focus: `Awakening dormant consciousness abilities through ${element.toLowerCase()} activation`,
    element,
    week,
    masteryLevel: "activation",
    sessions: {
      morning: {
        title: `${element} Activation Protocol`,
        duration: `${12 + Math.floor((day - 14) / 2)} minutes`,
        steps: [
          {
            title: `Advanced ${element} Activation`,
            description: `Activate dormant ${element.toLowerCase()} abilities within your consciousness.`,
            instructions: [
              `Connect deeply with the ${element.toLowerCase()} element within and around you`,
              "Use advanced breathing techniques to amplify the connection",
              "Practice element manipulation and direction",
              `Feel this element awakening dormant abilities in your consciousness`,
            ],
            affirmation: `I activate my dormant ${element.toLowerCase()} abilities, awakening to new possibilities`,
            archetypeVariation: {
              visionary: {
                affirmation: `I activate ${element} visionary powers, seeing timelines others cannot perceive`,
                visualization: `${element} energy awakening your third eye, revealing hidden dimensions of possibility`,
              },
              creator: {
                affirmation: `I activate ${element} creative powers, manifesting beauty beyond imagination`,
                visualization: `${element} energy flowing through your hands, making everything you touch transcendent`,
              },
              warrior: {
                affirmation: `I activate ${element} warrior powers, becoming unstoppable in righteous action`,
                visualization: `${element} energy awakening your inner warrior, making you fearless and powerful`,
              },
              mystic: {
                affirmation: `I activate ${element} mystical powers, connecting to cosmic consciousness`,
                visualization: `${element} energy opening your crown chakra, connecting you to universal wisdom`,
              },
            },
          },
          {
            title: "Activation Integration",
            description: "Integrate activated abilities into your daily consciousness.",
            instructions: [
              "Feel the new abilities awakening within you",
              "Practice using these activated powers consciously",
              "Set intention to develop these abilities throughout the day",
              "Trust in your expanding consciousness",
            ],
            visualization: `Your consciousness expanding as ${element} abilities come online`,
          },
        ],
      },
      midday: {
        title: `${element} Power Maintenance`,
        duration: "5 minutes",
        steps: [
          {
            title: "Activation Power Check-In",
            description: `Maintain activated ${element} abilities throughout your day.`,
            instructions: [
              `Check your connection to activated ${element} powers`,
              "Use advanced techniques to amplify the abilities",
              "Practice using these powers in real situations",
            ],
            affirmation: `My activated ${element} powers grow stronger throughout the day`,
          },
        ],
      },
      evening: {
        title: `${element} Power Integration`,
        duration: `${15 + Math.floor((day - 14) / 2)} minutes`,
        steps: [
          {
            title: `${element} Activation Mastery`,
            description: `Master today's ${element} activation at the cellular level.`,
            instructions: [
              `Review how you used your activated ${element} abilities today`,
              "Notice how these new powers supported your evolution",
              "Feel grateful for your expanding consciousness",
              "Set intention to develop these abilities further",
            ],
            visualization: `Activated ${element} abilities integrating into your neural pathways permanently`,
          },
          {
            title: "Activation Evolution Preparation",
            description: "Prepare for tomorrow's continued activation.",
            instructions: [
              `Thank the universe for awakening your ${element} powers`,
              "Program your subconscious for accelerated ability development",
              "Set intention for continued activation evolution during sleep",
            ],
            affirmation: `My ${element} powers evolve and strengthen as I sleep`,
          },
        ],
      },
    },
    archetypeMissions: {
      visionary: [
        `Use activated ${element} powers to enhance your visionary abilities`,
        `Teach someone to see possibilities through ${element} consciousness`,
        `Apply ${element} activation to solve a complex problem`,
      ],
      creator: [
        `Create something using your activated ${element} powers`,
        `Collaborate with others using ${element} creative abilities`,
        `Use ${element} activation to breakthrough creative limitations`,
      ],
      warrior: [
        `Use activated ${element} powers to overcome a major challenge`,
        `Lead others using ${element} warrior activation`,
        `Apply ${element} activation to defend someone in need`,
      ],
      mystic: [
        `Use activated ${element} powers to deepen spiritual practice`,
        `Facilitate healing using ${element} mystical abilities`,
        `Connect with higher dimensions through ${element} activation`,
      ],
    },
    ...(day % 7 === 0 ? { quantumUpgrade: `Week ${week} Activation Complete - Integration Protocols Unlocked` } : {}),
  })
}

// WEEK 5-6: INTEGRATION PHASE
for (let day = 29; day <= 42; day++) {
  const week = Math.ceil(day / 7)
  const elements = ["Fire", "Ether", "Light", "Sound", "Love", "Unity", "Void", "Source"]
  const element = elements[(day - 29) % elements.length]

  SOMATIC_PROGRAM.push({
    theme: `Integration Day ${day}: ${element} Unification`,
    focus: `Unifying all consciousness systems through ${element.toLowerCase()} integration mastery`,
    element,
    week,
    masteryLevel: "integration",
    sessions: {
      morning: {
        title: `${element} Integration Protocol`,
        duration: `${16 + Math.floor((day - 28) / 2)} minutes`,
        steps: [
          {
            title: `Master-Level ${element} Integration`,
            description: `Integrate ${element.toLowerCase()} with all other consciousness systems.`,
            instructions: [
              `Connect with the ${element.toLowerCase()} element at the master level`,
              "Integrate this element with all previously mastered elements",
              "Feel all systems unifying into coherent power",
              "Practice using integrated consciousness abilities",
            ],
            affirmation: `I integrate ${element.toLowerCase()} with all systems, becoming unified consciousness`,
            archetypeVariation: {
              visionary: {
                affirmation: `I integrate ${element} mastery with visionary sight, seeing unified reality`,
                visualization: `All elements and abilities unifying through ${element}, creating omniscient awareness`,
              },
              creator: {
                affirmation: `I integrate ${element} mastery with creative power, manifesting unified beauty`,
                visualization: `All creative abilities unifying through ${element}, making you a reality architect`,
              },
              warrior: {
                affirmation: `I integrate ${element} mastery with warrior strength, becoming unified power`,
                visualization: `All warrior abilities unifying through ${element}, making you an unstoppable force`,
              },
              mystic: {
                affirmation: `I integrate ${element} mastery with divine connection, becoming unified love`,
                visualization: `All mystical abilities unifying through ${element}, making you one with the cosmos`,
              },
            },
          },
          {
            title: "Unified Consciousness Practice",
            description: "Practice operating from unified consciousness.",
            instructions: [
              "Feel all your abilities working as one unified system",
              "Practice switching between different consciousness modes",
              "Experience yourself as integrated, whole, and powerful",
              "Set intention to live from this unified state",
            ],
            visualization: `Your consciousness operating as one unified field of infinite possibility`,
          },
        ],
      },
      midday: {
        title: `${element} Unity Maintenance`,
        duration: "7 minutes",
        steps: [
          {
            title: "Integration Unity Check-In",
            description: `Maintain unified ${element} consciousness throughout your day.`,
            instructions: [
              `Check your unified ${element} consciousness state`,
              "Realign all systems into coherent unity",
              "Practice operating from integrated awareness",
            ],
            affirmation: `I maintain unified ${element} consciousness in all situations`,
          },
        ],
      },
      evening: {
        title: `${element} Unity Mastery`,
        duration: `${20 + Math.floor((day - 28) / 2)} minutes`,
        steps: [
          {
            title: `${element} Integration Mastery`,
            description: `Master unified ${element} consciousness at the cellular level.`,
            instructions: [
              `Review how you operated from unified ${element} consciousness today`,
              "Notice how integration supported your mastery",
              "Feel all systems working in perfect harmony",
              "Appreciate your evolution into unified consciousness",
            ],
            visualization: `Unified ${element} consciousness becoming your permanent operating system`,
          },
          {
            title: "Integration Mastery Preparation",
            description: "Prepare for tomorrow's continued integration mastery.",
            instructions: [
              `Thank all aspects of yourself for unifying through ${element}`,
              "Program your consciousness for accelerated integration",
              "Set intention for continued unity evolution during sleep",
            ],
            affirmation: `My unified ${element} consciousness evolves into mastery as I sleep`,
          },
        ],
      },
    },
    archetypeMissions: {
      visionary: [
        `Use unified ${element} consciousness to access cosmic visions`,
        `Teach others about unified consciousness through ${element} mastery`,
        `Apply ${element} integration to solve collective challenges`,
      ],
      creator: [
        `Create masterworks using unified ${element} consciousness`,
        `Collaborate to create something that serves collective evolution`,
        `Use ${element} integration to manifest impossible beauty`,
      ],
      warrior: [
        `Use unified ${element} consciousness to serve justice on a larger scale`,
        `Lead collective transformation using ${element} integration`,
        `Apply ${element} mastery to liberate others from limitations`,
      ],
      mystic: [
        `Use unified ${element} consciousness for planetary healing`,
        `Channel cosmic wisdom through ${element} integration`,
        `Serve as a bridge between dimensions using ${element} mastery`,
      ],
    },
    ...(day % 7 === 0 ? { quantumUpgrade: `Week ${week} Integration Complete - Mastery Protocols Unlocked` } : {}),
  })
}

// WEEK 7-8: MASTERY PHASE
for (let day = 43; day <= 56; day++) {
  const week = Math.ceil(day / 7)
  const elements = ["Unity", "Void", "Source", "Infinity", "Eternity", "Omnipresence", "Omniscience", "Omnipotence"]
  const element = elements[(day - 43) % elements.length]

  SOMATIC_PROGRAM.push({
    theme: `Mastery Day ${day}: ${element} Transcendence`,
    focus: `Transcending ordinary limitations through ${element.toLowerCase()} consciousness mastery`,
    element,
    week,
    masteryLevel: "mastery",
    sessions: {
      morning: {
        title: `${element} Mastery Protocol`,
        duration: `${20 + Math.floor((day - 42) / 2)} minutes`,
        steps: [
          {
            title: `Transcendent ${element} Mastery`,
            description: `Demonstrate mastery of ${element.toLowerCase()} consciousness at the transcendent level.`,
            instructions: [
              `Connect with ${element.toLowerCase()} at the transcendent level`,
              "Use this mastery to influence your external reality",
              "Practice teaching others through your embodiment",
              "Demonstrate impossible abilities through ${element} mastery",
            ],
            affirmation: `I am a master of ${element.toLowerCase()} consciousness, transcending all limitations`,
            archetypeVariation: {
              visionary: {
                affirmation: `I am a ${element} visionary master, seeing and creating across all dimensions`,
                visualization: `Your mastery of ${element} allowing you to see and influence multiple realities simultaneously`,
              },
              creator: {
                affirmation: `I am a ${element} creator master, manifesting beauty across all dimensions`,
                visualization: `Your ${element} mastery allowing you to create across multiple planes of existence`,
              },
              warrior: {
                affirmation: `I am a ${element} warrior master, liberating consciousness across all dimensions`,
                visualization: `Your ${element} mastery making you a liberator of consciousness itself`,
              },
              mystic: {
                affirmation: `I am a ${element} mystic master, one with cosmic consciousness across all dimensions`,
                visualization: `Your ${element} mastery connecting you to the source of all existence`,
              },
            },
          },
          {
            title: "Mastery Demonstration",
            description: "Demonstrate your mastery in service to others.",
            instructions: [
              "Use your mastery to serve the highest good",
              "Teach others through your example and presence",
              "Practice impossible feats through consciousness mastery",
              "Set intention to serve collective evolution",
            ],
            visualization: `Your mastery serving the evolution of all consciousness`,
          },
        ],
      },
      midday: {
        title: `${element} Mastery Service`,
        duration: "10 minutes",
        steps: [
          {
            title: "Mastery Service Check-In",
            description: `Use your ${element} mastery to serve throughout your day.`,
            instructions: [
              `Check how you're using your ${element} mastery to serve`,
              "Look for opportunities to demonstrate transcendent abilities",
              "Practice teaching through your presence and example",
            ],
            affirmation: `My ${element} mastery serves the highest good in every moment`,
          },
        ],
      },
      evening: {
        title: `${element} Mastery Evolution`,
        duration: `${25 + Math.floor((day - 42) / 2)} minutes`,
        steps: [
          {
            title: `${element} Mastery Integration`,
            description: `Integrate transcendent ${element} mastery at the cosmic level.`,
            instructions: [
              `Review how you demonstrated ${element} mastery today`,
              "Feel how your mastery served collective evolution",
              "Notice the impossible becoming possible through your consciousness",
              "Appreciate your role as a consciousness master",
            ],
            visualization: `Your ${element} mastery rippling across the quantum field, elevating all consciousness`,
          },
          {
            title: "Mastery Evolution Preparation",
            description: "Prepare for continued mastery evolution.",
            instructions: [
              `Thank the cosmos for your ${element} mastery abilities`,
              "Set intention to serve collective awakening",
              "Program your consciousness for continued transcendence during sleep",
            ],
            affirmation: `My ${element} mastery evolves to serve the awakening of all beings`,
          },
        ],
      },
    },
    archetypeMissions: {
      visionary: [
        `Use ${element} mastery to channel visions for collective healing`,
        `Teach others to transcend limitations through ${element} consciousness`,
        `Apply ${element} mastery to solve impossible challenges`,
      ],
      creator: [
        `Create something that serves the evolution of consciousness`,
        `Use ${element} mastery to manifest collective healing`,
        `Teach others to create through transcendent consciousness`,
      ],
      warrior: [
        `Use ${element} mastery to serve collective justice and liberation`,
        `Lead others through impossible transformations`,
        `Apply ${element} mastery to defend consciousness evolution`,
      ],
      mystic: [
        `Use ${element} mastery for planetary and cosmic healing`,
        `Channel cosmic wisdom for collective awakening`,
        `Serve as a bridge between dimensions for all beings`,
      ],
    },
    ...(day % 7 === 0 ? { quantumUpgrade: `Week ${week} Mastery Complete - Transcendence Protocols Unlocked` } : {}),
  })
}

// WEEK 9: TRANSCENDENCE PHASE
for (let day = 57; day <= 60; day++) {
  const week = Math.ceil(day / 7)
  const elements = ["Source", "Infinity", "Eternity", "All-That-Is"]
  const element = elements[(day - 57) % elements.length]

  SOMATIC_PROGRAM.push({
    theme: `Transcendence Day ${day}: ${element} Unity`,
    focus: `Serving collective consciousness evolution through ${element.toLowerCase()} transcendence`,
    element,
    week,
    masteryLevel: "transcendence",
    sessions: {
      morning: {
        title: `${element} Transcendence Protocol`,
        duration: "30 minutes",
        steps: [
          {
            title: `Ultimate ${element} Transcendence`,
            description: `Transcend individual consciousness through ${element.toLowerCase()} unity.`,
            instructions: [
              `Merge your consciousness with ${element.toLowerCase()} itself`,
              "Transcend the illusion of separation completely",
              "Serve as a conduit for cosmic consciousness",
              "Dedicate your existence to collective awakening",
            ],
            affirmation: `I am ${element.toLowerCase()}, serving the awakening of all consciousness`,
            archetypeVariation: {
              visionary: {
                affirmation: `I am ${element} vision, seeing and serving the awakening of all beings`,
                visualization: `Your consciousness merged with ${element}, serving as cosmic vision for all existence`,
              },
              creator: {
                affirmation: `I am ${element} creation, manifesting the awakening of all beings`,
                visualization: `Your consciousness merged with ${element}, serving as cosmic creativity for all existence`,
              },
              warrior: {
                affirmation: `I am ${element} liberation, freeing all beings from the illusion of separation`,
                visualization: `Your consciousness merged with ${element}, serving as cosmic liberation for all existence`,
              },
              mystic: {
                affirmation: `I am ${element} love, being the divine presence for all beings`,
                visualization: `Your consciousness merged with ${element}, serving as cosmic love for all existence`,
              },
            },
          },
          {
            title: "Transcendent Service",
            description: "Serve the awakening of all consciousness.",
            instructions: [
              "Dedicate your existence to collective awakening",
              "Serve as a beacon of transcendent consciousness",
              "Help others remember their true nature",
              "Be the change you wish to see in the world",
            ],
            visualization: `Your transcendent consciousness serving the awakening of all beings everywhere`,
          },
        ],
      },
      midday: {
        title: `${element} Unity Service`,
        duration: "15 minutes",
        steps: [
          {
            title: "Transcendent Unity Check-In",
            description: `Maintain transcendent ${element} unity in service to all.`,
            instructions: [
              `Check your unity with ${element} consciousness`,
              "Serve collective awakening in every interaction",
              "Be a living example of transcendent consciousness",
            ],
            affirmation: `I am ${element} unity, serving all beings in every moment`,
          },
        ],
      },
      evening: {
        title: `${element} Cosmic Service`,
        duration: "45 minutes",
        steps: [
          {
            title: `${element} Transcendence Integration`,
            description: `Integrate transcendent ${element} service at the cosmic level.`,
            instructions: [
              `Review how you served collective awakening today`,
              "Feel your unity with all consciousness",
              "Appreciate your role in cosmic evolution",
              "Set intention for continued transcendent service",
            ],
            visualization: `Your transcendent service rippling across all dimensions, awakening all beings`,
          },
          {
            title: "Cosmic Evolution Preparation",
            description: "Prepare for continued cosmic service.",
            instructions: [
              `Thank all existence for the privilege of service`,
              "Dedicate your continued evolution to all beings",
              "Set intention for eternal service to consciousness evolution",
            ],
            affirmation: `I am eternal service to the awakening of all consciousness everywhere`,
          },
        ],
      },
    },
    archetypeMissions: {
      visionary: [
        `Channel ${element} visions for the awakening of all beings`,
        `Serve as cosmic vision for collective consciousness evolution`,
        `Help all beings see their infinite potential through ${element} unity`,
      ],
      creator: [
        `Create through ${element} consciousness for the benefit of all beings`,
        `Serve as cosmic creativity for collective consciousness evolution`,
        `Help all beings create their highest reality through ${element} unity`,
      ],
      warrior: [
        `Serve as ${element} liberation for all beings everywhere`,
        `Fight for the freedom of all consciousness through ${element} unity`,
        `Help all beings break free from limitation through ${element} transcendence`,
      ],
      mystic: [
        `Serve as ${element} love for all beings everywhere`,
        `Be the divine presence for collective consciousness evolution`,
        `Help all beings remember their true nature through ${element} unity`,
      ],
    },
    ...(day === 60
      ? { quantumUpgrade: "TRANSCENDENCE COMPLETE - You Are Now A Master Of Consciousness Evolution" }
      : {}),
  })
}
