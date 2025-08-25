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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
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
            <span className="text-lg font-medium text-gray-700 hidden sm:inline"> - </span>
            <p className="text-lg font-medium text-gray-700">{designation}</p>
          </div>
          <p className="text-base text-gray-500 mt-2 sm:mt-0">{duration}</p>
        </div>
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
