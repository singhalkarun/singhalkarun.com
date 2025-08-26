import Image from "next/image";

export default function Interests() {
  return (
    <section id="interests" className="mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Interests</h2>
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Image section */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 order-1 lg:order-1">
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative">
              <Image
                src="/pets-and-music.jpeg"
                alt="Cat and Guitar"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Image caption */}
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span>Music & Pets</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 order-2 lg:order-2">
          <div className="space-y-6">
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
              I&apos;ve grown up seeing lot of puppies and cats take birth in my house and love them a lot. I am owned by 2 cats, &ldquo;Mia&rdquo; and &ldquo;Tia&rdquo;
            </p>
            
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
              I love Music and been learning play Ukulele and recently learnt to play Sham, one of my favorite songs
            </p>

            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                I love to travel and explore new places and cultures. I&apos;ve lived across multiple cities in India including Nainital, Kota, Delhi, Mumbai, and currently living in Bangalore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
