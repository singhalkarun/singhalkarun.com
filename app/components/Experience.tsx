"use client";

import React from 'react';
import { useMode } from '../contexts/ModeContext';

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
  const { isCatMode } = useMode();
  
  const addCatCommentary = (text: string) => {
    if (!isCatMode) return text;
    
    // Different ways cats express themselves
    const catExpressions = [
      // Direct commentary
      " I supervised from my throne while he did the actual work.",
      " I could have done this better with my eyes closed.",
      " I was napping during this - he woke me up with his typing.",
      " I'm obviously more important than whatever this is.",
      " I helped by knocking things over - that's how you fix problems.",
      
      // Cat actions
      " *purrs* I was the real project manager.",
      " *stretches* I provided moral support by purring loudly.",
      " *yawns* I was being adorable while he struggled.",
      " *judges* I taught him everything he knows.",
      " *sits regally* I was the real boss here.",
      
      // Cat logic
      " I could have done this myself but I let him practice.",
      " I was busy being perfect while he made mistakes.",
      " I'm the real genius here - he just copies my ideas.",
      " I supervised from my nap spot - quality control is important.",
      " I knocked his coffee over during this - he needed a break.",
      
      // Cat superiority
      " I walked across his keyboard to help - cats are very helpful.",
      " I judged his work from my perch - it was acceptable.",
      " I provided emotional support by sitting on his lap.",
      " I was the real architect - he just implemented my vision.",
      " I'm obviously smarter - I can open doors and he can't.",
      
      // Cat dismissiveness
      " Whatever. I was there.",
      " Meh. I supervised.",
      " I guess this was okay.",
      " I was busy being cute.",
      " I helped by existing."
    ];
    
    const randomExpression = catExpressions[Math.floor(Math.random() * catExpressions.length)];
    return text + randomExpression;
  };
  
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
            <p className="text-xl font-semibold text-gray-700">
              {designation}
            </p>
          </div>
          <p className="text-lg text-gray-500 mt-2 sm:mt-0 font-medium">
            {duration}
          </p>
        </div>
      </div>
      
      {points.length > 0 && (
        <div className="mt-8">
          <div className="space-y-6">
            {points.map((point, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-4 text-xl text-black flex-shrink-0 mt-1">•</span>
                <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                  {renderTextWithLinks(addCatCommentary(point.text), point.links)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
