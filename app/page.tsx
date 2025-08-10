import Image from "next/image";
import Experience from "./components/Experience";

export default function Home() {
  const experiences = [
    {
      company: "Krutrim",
      designation: "Principal Engineer",
      duration: "Feb 2025 - Present",
      companyUrl: "https://www.olakrutrim.com",
      points: []
    },
    {
      company: "Samagra",
      designation: "Senior Software Engineer",
      duration: "Sep 2023 - Feb 2025",
      companyUrl: "https://samagragovernance.in",
      points: [
        { text: "Led SRE efforts across 20+ independent projects" },
        { text: "Founding engineer at BharatSahAiYak (n8n equivalent) - a platform to build multilingual AI agents - powered 4-5 large scale agents incl. KumbhSahAiYak (assistant for 600M+ religious gathering, 300K+ users, launched by Prime Minister of India) and KrishiSahAiYak (500K farmer interactions, top 30 IndiaAI Mission products)" },
        { text: "Built self-serve DevOps framework that reduced onboarding time from 7 days to 1 hour" }
      ]
    },
    {
      company: "EsMagico",
      designation: "Software Engineer 2",
      duration: "Jul 2022 - Aug 2023",
      companyUrl: "https://esmagico.com",
      points: [
        { text: "Led a 10+ member team to build the Plum Goodness app (1M+ downloads, 4.5★ rating on Android and iOS)" },
        { text: "Designed and implemented a streamlined hiring framework for the engineering team" }
      ]
    },
    {
      company: "Revolute",
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
      companyUrl: "",
      points: [
        { text: "Set up Thinkific to give Futurex members seamless, on-demand access to exclusive content and self-paced learning" }
      ]
    },
    {
      company: "Chatpod",
      designation: "Founding Engineer",
      duration: "Dec 2019 - Nov 2020",
      companyUrl: "",
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

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="py-1 mb-4">
          <h1 className="text-3xl font-bold mb-1">Karun Agarwal</h1>
          <p className="text-base text-gray-600">Software Engineer / Pet Parent</p>
        </div>
        
        <div className="py-1 mb-4">
          <h2 className="text-xl font-bold mb-2">About Me</h2>
          <p className="text-gray-700 text-sm">
            A technology enthusiast who skipped college to pursue his passion for solving real-world complex problems using tech, currently building in voice ai/ synthetic humans space
          </p>
        </div>
        
        <div className="py-1">
          <h2 className="text-xl font-bold mb-3">Corporate Experience</h2>
          <div>
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
        </div>
      </div>
    </div>
  );
}
