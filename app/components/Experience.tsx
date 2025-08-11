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
    <div className="mb-6 pb-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
      <div className="mb-3">
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
          {companyUrl ? (
            <a 
              href={companyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
              style={{ color: 'var(--primary)' }}
            >
              {company}
            </a>
          ) : (
            company
          )}
        </h3>
        <p className="text-base font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>{designation}</p>
        <p className="text-sm" style={{ color: 'var(--secondary-foreground)' }}>{duration}</p>
      </div>
      
      {points.length > 0 && (
        <div className="mt-3">
          <ul className="space-y-2">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-sm" style={{ color: 'var(--primary)' }}>•</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
