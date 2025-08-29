import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import History from "./components/History";
import Interests from "./components/Interests";
import Connect from "./components/Connect";
import ImageCaption from "./components/ImageCaption";

export default function Home() {
  const experiences = [
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
  ];

  const projects = [
    {
      title: "Scribbl - Multiplayer Drawing Game",
      description: "A real-time multiplayer drawing and guessing game inspired by Skribbl.io. Players take turns drawing words while others compete to guess correctly and earn points.",
      link: "https://github.com/singhalkarun/scribbl"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pb-12 pb-32">
          <Header />

          {/* Main H1 for SEO */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 mt-8">
            Karun Agarwal - Software Engineer
          </h1>

          {/* Tagline */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center mb-12">
            Building fleet of AI agents to understand human behavior
          </h2>

          {/* About Section */}
          <section id="about" className="mt-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">About</h3>
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-8 lg:space-y-0">
              {/* Photo section */}
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <div className="w-full max-w-sm mx-auto lg:mx-0">
                  <div className="relative">
                    <Image
                      src="/profile-photo.jpg"
                      alt="Karun Agarwal with his cat, software engineer based in India"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                  <ImageCaption 
                    text="Software Engineer & Pet Parent" 
                    hoverText="I got cats when they were 10 days old while staying in Mumbai and flew them in plane to Bengaluru"
                  />
                </div>
              </div>

              {/* Bio text section */}
              <div className="flex-1 lg:pt-4">
                <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                  Hey. I am Karun, a 22 yo software engineer based in India. 
                  I skipped college to pursue my passion for solving real-world complex 
                  problems using technology. Most recently, I worked at{" "}
                  <a 
                    href="https://www.olakrutrim.com" 
                    className="text-black hover:text-gray-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Krutrim
                  </a>{" "}
                  as the youngest Principal Engineer. Currently, I am building fleet of AI agents to understand human behavior.
                </p>
              </div>
            </div>
          </section>

          {/* History Section */}
          <History />

          {/* Interests Section */}
          <Interests />

          {/* Experience Section */}
          <section id="experience" className="mt-24">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Experience</h3>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <Experience
                  key={index}
                  company={exp.company}
                  designation={exp.designation}
                  duration={exp.duration}
                  companyUrl={exp.companyUrl}
                  points={exp.points}
                />
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mt-24">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Projects</h3>
            <div className="space-y-12">
              {projects.map((project, index) => (
                <div key={index} className="pb-12 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-700 underline transition-colors duration-200"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Connect Section */}
          <Connect />
        </div>
      </div>
      <Footer />
    </div>
  );
}
