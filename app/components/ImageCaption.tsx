interface ImageCaptionProps {
  text: string;
}

export default function ImageCaption({ text }: ImageCaptionProps) {
  return (
    <div className="mt-4 flex items-center text-sm text-gray-500">
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
      <span>{text}</span>
    </div>
  );
}
