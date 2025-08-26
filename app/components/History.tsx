import Image from "next/image";
import ImageCaption from "./ImageCaption";

export default function History() {
  return (
    <section id="history" className="mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">History</h2>
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Image section */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 order-1 lg:order-2">
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative">
              <Image
                src="/rack-server.jpeg"
                alt="Technology Journey"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <ImageCaption text="My First Rack Server" />
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 order-2 lg:order-1 lg:pr-6">
          <div className="space-y-6">
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
              Around 2010, I grew up in my dad&apos;s computer shop - part kid, part repair tech. When I wasn&apos;t doing 12-hour gaming marathons, 
              I was elbow-deep in hardware: swapping RAM, re-imaging drives, and chasing down why a desktop refused to boot.
            </p>
            
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
              Then curiosity kicked in: who actually &ldquo;owns&rdquo; the internet? I grabbed a static IP, ran cables across my room, and hosted my 
              first website from home. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
