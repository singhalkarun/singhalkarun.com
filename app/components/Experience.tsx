import React from 'react';

interface ExperiencePoint {
  text: string;
}

interface ExperienceProps {
  company: string;
  designation: string;
  duration: string;
  companyUrl?: string;
  points: ExperiencePoint[];
}

export default function Experience({ company, designation, duration, companyUrl, points }: ExperienceProps) {
  return (
    <div className="pb-8 border-b border-gray-200 last:border-b-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">
          {companyUrl ? (
            <a 
              href={companyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {company}
            </a>
          ) : (
            company
          )}
        </h2>
        <p className="text-lg font-medium mb-2 text-gray-700">{designation}</p>
        <p className="text-base text-gray-500">{duration}</p>
      </div>
      
      {points.length > 0 && (
        <div className="mt-6">
          <ul className="space-y-4">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-4 text-base text-blue-600 mt-1">•</span>
                <span className="text-base leading-relaxed text-gray-700">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
