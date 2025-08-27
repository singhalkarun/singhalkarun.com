import Image from "next/image";
import ImageCaption from "./ImageCaption";

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
            <ImageCaption text="Music & Pets" />
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 order-2 lg:order-2">
          <div className="space-y-6">
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
            I grew up surrounded by pets, and today I share my home with two cats, Mia and Tia, who keep life playful and grounded
            </p>
            
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
              I love Music and been learning to play Ukulele and recently learnt to play Sham, one of my favorite songs
            </p>

            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
            I love exploring new cultures and have lived across cities like Nainital, Kota, Delhi, Mumbai, and now Bangalore - each place shaping a piece of who I am
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
