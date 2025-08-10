import Image from "next/image";

export default function Home() {
  return (
    <div className="p-16">
      <div className="py-2">
        <h1 className="text-4xl font-bold">Karun Agarwal</h1>
        <p className="text-lg">Software Engineer / Pet Parent</p>
      </div>
      <div className="py-2">
        <h2 className="text-2xl font-bold">About Me</h2>
        <p>
          A technology enthusiast who skipped college to pursue his passion for solving real-world complex problems using tech, currently building in voice ai/ synthetic humans space
        </p>
      </div>
      <div className="py-2">
        <h2 className="text-2xl font-bold">Corporate Experience </h2>
        <ul className="pt-1">
          <li>
            <p className="font-bold"><a href="https://www.olakrutrim.com" target="_blank" className="underline text-blue-500">Krutrim</a> - Principal Engineer - Feb 2025 - Present</p>
          </li>
          <li>
            <p className="font-bold"><a href="https://samagragovernance.in" target="_blank" className="underline text-blue-500">Samagra</a> - Senior Software Engineer - Sep 2023 - Feb 2025</p>
          </li>
          <li>
            <p className="font-bold"><a href="https://esmagico.com" target="_blank" className="underline text-blue-500">EsMagico</a> - Software Engineer 2 - Jul 2022 - Aug 2023</p>
          </li>
          <li>
            <p className="font-bold">Revolute - Founding Engineer - Jan 2022 - Jun 2022</p>
          </li>
          <li>
            <p className="font-bold"><a href="https://www.oodles.com/" target="_blank" className="underline text-blue-500">Oodles</a> - Associate Consultant - Feb 2021 - Dec 2021</p>
          </li>
          <li>
            <p className="font-bold">FutureX - Founding Engineer - May 2020 - Jan 2021</p>
          </li>
          <li>
            <p className="font-bold">Chatpod - Founding Engineer - Dec 2019 - Nov 2020</p>
          </li>
          <li>
            <p className="font-bold"><a href="https://www.linkedin.com/company/toppr-com" target="_blank" className="underline text-blue-500">Toppr</a> - Content Developer - Jan 2019 - Dec 2019</p>
          </li>
        </ul>
      </div>
    </div>

  );
}
