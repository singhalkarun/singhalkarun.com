import { Metadata } from 'next';
import RoboticsForm from '@/app/components/RoboticsForm';

export const metadata: Metadata = {
  title: 'Robotics Lab - Karun Agarwal',
  description: 'Join a practical, hands-on robotics lab focused on building real-world projects',
  openGraph: {
    title: 'Robotics Lab - Karun Agarwal',
    description: 'Join a practical robotics lab',
    url: 'https://www.singhalkarun.com/robotics',
    type: 'website',
  },
};

export default function RoboticsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join Our Practical Robotics Lab
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-4">
            A small, intentional group of robotics beginners meeting weekly in Bangalore to learn together,
            share hardware, and build real projects.
          </p>
        </div>

        {/* About Me Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              Hey, I&apos;m Karun. I skipped college to pursue my passion for solving real-world complex problems using technology.
              Over the last 5 years, I&apos;ve led multiple products from 0 to 10.
            </p>
            <p>
              Recently, I&apos;ve been drawn to robotics - not for career reasons, but purely for the joy of learning and building with hardware.
              I&apos;m a complete newbie at this. No formal background, no advanced degrees - just genuine curiosity.
            </p>
            <p>
              Over the last few weeks, I reached out to dozens of people trying to borrow a SO-100/SO-101 robotic arm.
              I finally borrowed a Waveshare 5-DOF Robotic ARM from a founder friend. Through this process, I realized:
              <strong> access to hardware is expensive and hard to come by</strong>. If we&apos;re all trying to learn robotics individually,
              we&apos;re all facing the same problem. So why not solve it together?
            </p>
          </div>
        </div>

        {/* Why This Lab Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why This Lab?
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              This is still a nascent idea, but here&apos;s what I&apos;m thinking:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Small offline recurring meets (likely weekly) in Bangalore</li>
              <li>We pick a goal together, break it down into problems, and solve them collaboratively</li>
              <li>Share hardware and resources so we&apos;re not all buying the same expensive equipment</li>
              <li>Learn from each other&apos;s wins and failures</li>
            </ul>
            <p>
              I&apos;m still thinking through exactly how this will work over the coming weeks, but the core idea is simple:
              make robotics more accessible through collaboration.
            </p>
          </div>
        </div>

        {/* Who Is This For Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Who Is This For?
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              This lab is for you if:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You&apos;re a beginner trying to learn robotics (no prior experience needed)</li>
              <li>You&apos;re based in Bangalore and can attend weekly offline meets</li>
              <li>You&apos;re genuinely excited about learning robotics, not just curious</li>
              <li>You&apos;re willing to collaborate, share, and learn together</li>
              <li>You want to build real things, not just watch tutorials</li>
            </ul>
            <p className="font-medium">
              I want this to be a highly intentional group where only those who are truly excited about
              learning robotics come together.
            </p>
          </div>
        </div>

        {/* Who This Is NOT For Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Who This Is NOT For
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              Please don&apos;t apply if:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You&apos;re looking for job opportunities or networking for career advancement</li>
              <li>You&apos;re doing robotics because &quot;everyone is doing it&quot; or it&apos;s trendy</li>
              <li>You want structured courses or formal teaching (this is peer learning, not a class)</li>
              <li>You&apos;re not willing to commit to regular weekly attendance</li>
              <li>You just want to watch others work or aren&apos;t interested in getting your hands dirty</li>
              <li>You&apos;re looking for a quick weekend hobby without real commitment</li>
            </ul>
            <p className="font-medium">
              This is about genuine curiosity and collaborative learning, not career building or following trends.
            </p>
          </div>
        </div>

        {/* What You'll Get Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What You&apos;ll Get
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Shared Hardware Access:</strong> Borrow and use robotics equipment without buying everything yourself</li>
              <li><strong>Weekly Hands-On Learning:</strong> Regular offline sessions focused on building and solving real problems</li>
              <li><strong>Collaborative Problem-Solving:</strong> Work with others who are on the same learning journey</li>
              <li><strong>Project-Based Learning:</strong> Learn by doing, not just reading or watching</li>
              <li><strong>A Space to Experiment:</strong> A physical space where you can tinker, fail, and iterate</li>
            </ul>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Next Steps
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              If this sounds like something you&apos;d be excited about, fill out the form below. Please take your
              time with the answers - I want to genuinely hear about you and understand what you&apos;re looking for.
            </p>
            <p>
              Over the coming weeks, I&apos;ll be speaking 1:1 with people who seem like the right fit for the group.
              This isn&apos;t about credentials or experience - it&apos;s about finding people who are genuinely excited to
              learn and collaborate.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Express Your Interest
          </h2>
          <RoboticsForm />
        </div>
      </div>
    </div>
  );
}
