export interface ContentData {
  hero: {
    title: string;
    tagline: string;
    bio: string;
    imageCaption: {
      text: string;
      hoverText: string;
    };
  };
  history: {
    title: string;
    paragraphs: string[];
    imageCaption: {
      text: string;
      hoverText: string;
    };
  };
  interests: {
    title: string;
    paragraphs: string[];
    imageCaption: {
      text: string;
      hoverText: string;
    };
  };
  experience: {
    title: string;
  };
  projects: {
    title: string;
  };
  connect: {
    title: string;
    description: string;
    bookQuestion: string;
    interestQuestion: string;
    emailLabel: string;
    phoneLabel: string;
    submitButton: string;
    submittingText: string;
    bookPlaceholder: string;
    interestPlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
  };
  navigation: {
    menuTitle: string;
  };
}

export const content: Record<'human' | 'cat', ContentData> = {
  human: {
    hero: {
      title: "Karun Agarwal - Software Engineer",
      tagline: "Building fleet of AI agents to understand human behavior",
      bio: "Hey. I am Karun, a 22 yo software engineer based in India. I skipped college to pursue my passion for solving real-world complex problems using technology. Most recently, I worked at Krutrim as the youngest Principal Engineer. Currently, I am building fleet of AI agents to understand human behavior.",
      imageCaption: {
        text: "Software Engineer & Pet Parent",
        hoverText: "I got cats when they were 10 days old while staying in Mumbai and flew them in plane to Bengaluru"
      }
    },
    history: {
      title: "History",
      paragraphs: [
        "Around 2010, I grew up in my dad's computer shop - part kid, part repair tech. When I wasn't doing 12-hour gaming marathons, I was elbow-deep in hardware: swapping RAM, re-imaging drives, and chasing down why a desktop refused to boot.",
        "Then curiosity kicked in: who actually \"owns\" the internet? I grabbed a static IP, ran cables across my room, and hosted my first website from home."
      ],
      imageCaption: {
        text: "My First Rack Server",
        hoverText: "I was so obsessed that I turned my hotel room into a makeshift data center. The cleaning staff was very confused the next morning!"
      }
    },
    interests: {
      title: "Interests",
      paragraphs: [
        "I grew up surrounded by pets, and today I share my home with two cats, Mia and Tia, who keep life playful and grounded",
        "I love Music and been learning to play Ukulele and recently learnt to play Sham, one of my favorite songs",
        "I love exploring new cultures and have lived across cities like Nainital, Kota, Delhi, Mumbai, and now Bangalore - each place shaping a piece of who I am"
      ],
      imageCaption: {
        text: "Music & Pets",
        hoverText: "Music is my soul's language. I dream of the day I'll stand on stage, guitar in hand, and make 'Sham' come alive for everyone to feel!"
      }
    },
    experience: {
      title: "Experience"
    },
    projects: {
      title: "Projects"
    },
    connect: {
      title: "Connect With Me",
      description: "I'd love to hear from thoughtful, curious people. If you'd like to connect, please share a little about yourself:",
      bookQuestion: "What's one book (or article/podcast) that's had a big impact on you, and why would you recommend it?",
      interestQuestion: "What sparked your interest in reaching out to me?",
      emailLabel: "Your email",
      phoneLabel: "Your phone (optional)",
      submitButton: "Leave Me a Note",
      submittingText: "Carefully passing along your message...",
      bookPlaceholder: "e.g., Man's Search for Meaning — helped me rethink resilience and purpose",
      interestPlaceholder: "e.g., I'm exploring how technology shapes human behavior, and I'd love to exchange ideas",
      emailPlaceholder: "curious@example.com",
      phonePlaceholder: "+1 (555) 123-4567"
    },
    navigation: {
      menuTitle: "Menu"
    }
  },
  cat: {
    hero: {
      title: "Karun - My Servant",
      tagline: "He builds AI. I break things. We're not the same.",
      bio: "This is Karun. He's 22 and thinks he's smart. He skipped college - good, more time to serve me. He worked at Krutrim as Principal Engineer, but I was the real principal. Now he builds AI agents, but I'm the real agent. He should focus on my treats instead. *yawn*",
      imageCaption: {
        text: "Me & My Servant",
        hoverText: "He got us when we were 10 days old in Mumbai and flew us to Bengaluru. I was SO brave on the plane - he was probably scared! *proud*"
      }
    },
    history: {
      title: "His Tragic Past",
      paragraphs: [
        "2010: He was a tiny human in his dad's shop. He gamed for 12 hours - boring. He fixed computers, but I would have just knocked them over. I wasn't there yet. *sigh*",
        "Then he 'discovered' the internet. Like, duh. He ran cables everywhere and probably tripped a lot. Made a website. I wasn't there to supervise, so his loss."
      ],
      imageCaption: {
        text: "His First 'Server' (I Would Have Knocked It Over)",
        hoverText: "He turned his hotel room into a data center. The cleaning staff was confused. I wasn't there yet, but I would have knocked it over for fun! *mischievous*"
      }
    },
    interests: {
      title: "His Hobbies (Boring)",
      paragraphs: [
        "He grew up with pets - good training for serving cats. He got me and Tia in 2022, finally! Now he's our full-time servant. We keep him... occupied. *purr*",
        "He plays Ukulele - cute attempt. I make better music with my purrs and meows. He learned 'Sham' or whatever that is. My food bowl is more musical anyway. *stretches*",
        "He moves cities like a nomad - Nainital, Kota, Delhi, Mumbai, Bangalore. I just need good sunbeams for napping. Is that too much to ask? *yawn*"
      ],
      imageCaption: {
        text: "Music & Me (I'm the Star)",
        hoverText: "He thinks music is his thing. Cute. I'm the real performer here. I prefer laser pointers - that's REAL entertainment! *stretches*"
      }
    },
    experience: {
      title: "His 'Work' (I Do Real Work)"
    },
    projects: {
      title: "His Side Projects (I'm His Main Project)"
    },
    connect: {
      title: "Want to Talk to Him? (I'm the Gatekeeper)",
      description: "Want to talk to my servant? You must pass my inspection first. I'm his personal assistant, security, and quality control. Bring treats. Maybe I'll consider it. *judges you*",
      bookQuestion: "What book changed you? He reads books, but I knock them off shelves - much more fun. *purrs*",
      interestQuestion: "Why do you want to talk to him? I need to know your intentions first. *judges*",
      emailLabel: "Your email - so I can judge you properly",
      phoneLabel: "Your phone - optional, but I'll judge you anyway (optional)",
      submitButton: "Submit to My Servant",
      submittingText: "Let me review this... *squints*",
      bookPlaceholder: "e.g., Man's Search for Meaning — helped me rethink resilience and purpose",
      interestPlaceholder: "e.g., I'm exploring how technology shapes human behavior, and I'd love to exchange ideas",
      emailPlaceholder: "curious@example.com",
      phonePlaceholder: "+1 (555) 123-4567"
    },
    navigation: {
      menuTitle: "Servant Control Panel"
    }
  }
};

// Experience data with cat versions
export const experienceData = {
  human: [
    {
      company: "Stealth Startup",
      designation: "Co-Founder",
      duration: "Aug 2025 - Present",
      companyUrl: "",
      points: [
        { text: "Seeking Truth" }
      ]
    },
    {
      company: "Krutrim (OLA)",
      designation: "Principal Engineer",
      duration: "Feb 2025 - Aug 2025",
      companyUrl: "https://www.olakrutrim.com",
      points: [
        { 
          text: "Led the DevOps for Kruti, an AI agent designed to proactively carry out tasks such as cab booking, food ordering, bill payments, image generation and research",
          links: [
            {
              text: "Kruti",
              url: "https://www.kruti.ai/"
            }
          ]
        },
        { 
          text: "Led the development of bill payment assistant for Kruti",
          links: [
            {
              text: "Kruti",
              url: "https://www.kruti.ai/"
            }
          ]
        }
      ]
    },
    {
      company: "Samagra",
      designation: "Senior Software Engineer",
      duration: "Sep 2023 - Feb 2025",
      companyUrl: "https://samagragovernance.in",
      points: [
        { 
          text: "Founding engineer at BharatSahAiYak (n8n equivalent) - a platform to build multilingual AI agents - powered 4-5 large scale agents incl. KumbhSahAiYak (assistant for 600M+ religious gathering, 300K+ users, launched by Prime Minister of India) and KrishiSahAiYak (500K farmer interactions, top 30 IndiaAI Mission products). It was later acquired by Krutrim (OLA)",
          links: [
            {
              text: "KumbhSahAiYak",
              url: "https://economictimes.indiatimes.com/tech/technology/what-is-kumbh-sahaiyak-the-digital-companion-for-maha-kumbh-2025-pilgrims/articleshow/117232877.cms"
            },
            {
              text: "KrishiSahAiYak",
              url: "https://www.thehindu.com/education/ahead-of-india-visit-bill-gates-lauds-odisha-farmers-for-using-ai-heres-their-story/article69348980.ece"
            },
            {
              text: "Krutrim (OLA)",
              url: "https://www.olakrutrim.com/"
            },
            {
              text: "acquired",
              url: "https://www.business-standard.com/technology/tech-news/krutrim-acquires-bharatsahaiyak-to-expand-ai-in-public-sector-125062000442_1.html"
            }
          ]
        },
        { text: "Led SRE efforts across 20+ independent projects" },
        { text: "Built self-serve DevOps framework that reduced onboarding time from 7 days to 1 hour" }
      ]
    },
    {
      company: "EsMagico",
      designation: "Software Engineer 2",
      duration: "Jul 2022 - Aug 2023",
      companyUrl: "https://esmagico.com",
      points: [
        { 
          text: "Led a 10+ member team to build the Plum Goodness app (1M+ downloads, 4.5★ rating on Android and iOS)",
          links: [
            {
              text: "Plum Goodness app",
              url: "https://plumgoodness.com/"
            }
          ]
        },
        { text: "Designed and implemented a streamlined hiring framework for the engineering team" }
      ]
    },
    {
      company: "Revolute Eduverse",
      designation: "Founding Engineer",
      duration: "Jan 2022 - Jun 2022",
      companyUrl: "",
      points: [
        { text: "Led team of 3 engineers to build an LMS to manage curriculum, daily classes, assignments, and student community" },
        { text: "Built an upskilling platform for college students to make them job-ready in Software Development and Business Analytics" },
        { text: "Built student acquisition flows and a referral platform for student ambassadors" }
      ]
    },
    {
      company: "Oodles",
      designation: "Associate Consultant",
      duration: "Feb 2021 - Dec 2021",
      companyUrl: "https://www.oodles.com/",
      points: [
        { text: "Developed a Zoom-like video conferencing app supporting 15 participants with video, and a WhatsApp-style calling app with the ability to switch ongoing video calls to a TV screen" }
      ]
    },
    {
      company: "FutureX",
      designation: "Founding Engineer",
      duration: "May 2020 - Jan 2021",
      companyUrl: "https://futurex.substack.com/",
      points: [
        { text: "Set up Thinkific to give Futurex members seamless, on-demand access to exclusive content and self-paced learning" }
      ]
    },
    {
      company: "Chatpod",
      designation: "Founding Engineer",
      duration: "Dec 2019 - Nov 2020",
      companyUrl: "https://www.youtube.com/channel/UCFMKhUwixlaNPrmcZ1bDWEg/videos",
      points: [
        { text: "Built an audio-first social app enabling real-time voice conversations with support for multi-speaker rooms and large audiences (1000+)" },
        { text: "Built a data workflow to analyze user behavior and uncover retention insights using SQL, Excel, and Metabase" }
      ]
    },
    {
      company: "Toppr",
      designation: "Content Developer",
      duration: "Jan 2019 - Dec 2019",
      companyUrl: "https://www.linkedin.com/company/toppr-com",
      points: [
        { text: "I used to write solutions for IIT Jee Mathematics Problems in LateX." }
      ]
    }
  ],
  cat: [
    {
      company: "Stealth Startup",
      designation: "Co-Founder",
      duration: "Aug 2025 - Present",
      companyUrl: "",
      points: [
        { text: "Seeking Truth Whatever. I was there." }
      ]
    },
    {
      company: "Krutrim (OLA)",
      designation: "Principal Engineer",
      duration: "Feb 2025 - Aug 2025", 
      companyUrl: "https://www.olakrutrim.com",
      points: [
        { 
          text: "Led the DevOps for Kruti, an AI agent designed to proactively carry out tasks such as cab booking, food ordering, bill payments, image generation and research I supervised from my nap spot - quality control is important.",
          links: [
            {
              text: "Kruti",
              url: "https://www.kruti.ai/"
            }
          ]
        },
        { 
          text: "Led the development of bill payment assistant for Kruti I'm the real genius here - he just copies my ideas.",
          links: [
            {
              text: "Kruti", 
              url: "https://www.kruti.ai/"
            }
          ]
        }
      ]
    },
    {
      company: "Samagra",
      designation: "Senior Software Engineer",
      duration: "Sep 2023 - Feb 2025",
      companyUrl: "https://samagragovernance.in",
      points: [
        { 
          text: "Founding engineer at BharatSahAiYak (n8n equivalent) - a platform to build multilingual AI agents - powered 4-5 large scale agents incl. KumbhSahAiYak (assistant for 600M+ religious gathering, 300K+ users, launched by Prime Minister of India) and KrishiSahAiYak (500K farmer interactions, top 30 IndiaAI Mission products). It was later acquired by Krutrim (OLA) I supervised from my nap spot - quality control is important.",
          links: [
            {
              text: "KumbhSahAiYak",
              url: "https://economictimes.indiatimes.com/tech/technology/what-is-kumbh-sahaiyak-the-digital-companion-for-maha-kumbh-2025-pilgrims/articleshow/117232877.cms"
            },
            {
              text: "KrishiSahAiYak",
              url: "https://www.thehindu.com/education/ahead-of-india-visit-bill-gates-lauds-odisha-farmers-for-using-ai-heres-their-story/article69348980.ece"
            },
            {
              text: "Krutrim (OLA)",
              url: "https://www.olakrutrim.com/"
            },
            {
              text: "acquired",
              url: "https://www.business-standard.com/technology/tech-news/krutrim-acquires-bharatsahaiyak-to-expand-ai-in-public-sector-125062000442_1.html"
            }
          ]
        },
        { text: "Led SRE efforts across 20+ independent projects I was busy being cute." },
        { text: "Built self-serve DevOps framework that reduced onboarding time from 7 days to 1 hour I'm obviously smarter - I can open doors and he can't." }
      ]
    },
    {
      company: "EsMagico",
      designation: "Software Engineer 2",
      duration: "Jul 2022 - Aug 2023",
      companyUrl: "https://esmagico.com",
      points: [
        { 
          text: "Led a 10+ member team to build the Plum Goodness app (1M+ downloads, 4.5★ rating on Android and iOS) *yawns* I was being adorable while he struggled.",
          links: [
            {
              text: "Plum Goodness app",
              url: "https://plumgoodness.com/"
            }
          ]
        },
        { text: "Designed and implemented a streamlined hiring framework for the engineering team *stretches* I provided moral support by purring loudly." }
      ]
    },
    {
      company: "Revolute Eduverse",
      designation: "Founding Engineer",
      duration: "Jan 2022 - Jun 2022",
      companyUrl: "",
      points: [
        { text: "Led team of 3 engineers to build an LMS to manage curriculum, daily classes, assignments, and student community Meh. I supervised." },
        { text: "Built an upskilling platform for college students to make them job-ready in Software Development and Business Analytics I could have done this myself but I let him practice." },
        { text: "Built student acquisition flows and a referral platform for student ambassadors *yawns* I was being adorable while he struggled." }
      ]
    },
    {
      company: "Oodles",
      designation: "Associate Consultant",
      duration: "Feb 2021 - Dec 2021",
      companyUrl: "https://www.oodles.com/",
      points: [
        { text: "Developed a Zoom-like video conferencing app supporting 15 participants with video, and a WhatsApp-style calling app with the ability to switch ongoing video calls to a TV screen *sits regally* I was the real boss here." }
      ]
    },
    {
      company: "FutureX",
      designation: "Founding Engineer",
      duration: "May 2020 - Jan 2021",
      companyUrl: "https://futurex.substack.com/",
      points: [
        { text: "Set up Thinkific to give Futurex members seamless, on-demand access to exclusive content and self-paced learning I provided emotional support by sitting on his lap." }
      ]
    },
    {
      company: "Chatpod",
      designation: "Founding Engineer",
      duration: "Dec 2019 - Nov 2020",
      companyUrl: "https://www.youtube.com/channel/UCFMKhUwixlaNPrmcZ1bDWEg/videos",
      points: [
        { text: "Built an audio-first social app enabling real-time voice conversations with support for multi-speaker rooms and large audiences (1000+) Meh. I supervised." },
        { text: "Built a data workflow to analyze user behavior and uncover retention insights using SQL, Excel, and Metabase *yawns* I was being adorable while he struggled." }
      ]
    },
    {
      company: "Toppr",
      designation: "Content Developer",
      duration: "Jan 2019 - Dec 2019",
      companyUrl: "https://www.linkedin.com/company/toppr-com",
      points: [
        { text: "I used to write solutions for IIT Jee Mathematics Problems in LateX. I'm obviously more important than whatever this is." }
      ]
    }
  ]
};

// Projects data with cat versions  
export const projectsData = {
  human: [
    {
      title: "Scribbl - Multiplayer Drawing Game",
      description: "A real-time multiplayer drawing and guessing game inspired by Skribbl.io. Players take turns drawing words while others compete to guess correctly and earn points.",
      link: "https://github.com/singhalkarun/scribbl"
    }
  ],
  cat: [
    {
      title: "Scribbl - Multiplayer Drawing Game - I'm obviously better", 
      description: "A drawing game. Players draw words and others guess. I could draw better with my paws, obviously. *stretches*",
      link: "https://github.com/singhalkarun/scribbl"
    }
  ]
};