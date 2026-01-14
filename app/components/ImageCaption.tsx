interface ImageCaptionProps {
  text: string;
  hoverText?: string;
}

export default function ImageCaption({ text, hoverText }: ImageCaptionProps) {
  return (
    <div className="mt-4 flex items-center text-sm text-gray-500 group relative">
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
      <span className="cursor-pointer">{text}</span>
      
      {hoverText && (
        <div className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none max-w-xs break-words z-10">
          {hoverText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
