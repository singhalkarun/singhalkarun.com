import React from 'react';

interface ExperiencePoint {
  text: string;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

interface ExperienceProps {
  company: string;
  designation: string;
  duration: string;
  companyUrl?: string;
  points: ExperiencePoint[];
}

export default function Experience({ company, designation, duration, companyUrl, points }: ExperienceProps) {
  const renderTextWithLinks = (text: string, links?: Array<{ text: string; url: string }>) => {
    if (!links || links.length === 0) {
      return text;
    }

    let result = text;
    links.forEach((link) => {
      const linkElement = `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-black hover:text-gray-700 underline transition-colors duration-200">${link.text}</a>`;
      result = result.replace(link.text, linkElement);
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="pb-12 border-b border-gray-200 last:border-b-0">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {companyUrl ? (
                <a 
                  href={companyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 underline transition-colors duration-200"
                >
                  {company}
                </a>
              ) : (
                company
              )}
            </h3>
            <span className="text-xl font-semibold text-gray-700 hidden sm:inline"> - </span>
            <p className="text-xl font-semibold text-gray-700">{designation}</p>
          </div>
          <p className="text-lg text-gray-500 mt-2 sm:mt-0 font-medium">{duration}</p>
        </div>
      </div>
      
      {points.length > 0 && (
        <div className="mt-8">
          <div className="space-y-6">
            {points.map((point, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-4 text-xl text-black flex-shrink-0 mt-1">•</span>
                <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                  {renderTextWithLinks(point.text, point.links)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
