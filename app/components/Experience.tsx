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
    <div className="mb-4 pb-3 border-b border-gray-200 last:border-b-0">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
          {companyUrl ? (
            <a 
              href={companyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {company}
            </a>
          ) : (
            company
          )}
        </h3>
        <p className="text-sm font-medium text-gray-700 mb-0.5">{designation}</p>
        <p className="text-xs text-gray-500">{duration}</p>
      </div>
      
      {points.length > 0 && (
        <div className="mt-2">
          <ul className="space-y-0.5">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-1.5 text-xs">•</span>
                <span className="text-gray-700 text-xs leading-tight">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
