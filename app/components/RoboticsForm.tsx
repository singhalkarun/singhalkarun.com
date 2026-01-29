"use client";

import { useState } from "react";
import { submitRoboticsForm } from "../actions/submitRoboticsForm";

export default function RoboticsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalMessage, setGeneralMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setGeneralMessage(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const result = await submitRoboticsForm(formData);

      if (result.success) {
        setGeneralMessage({ type: 'success', text: result.message });
        (e.target as HTMLFormElement).reset();
      } else if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
    } catch (error) {
      setGeneralMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFieldError = (fieldName: string) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-gray-900 mb-3">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={() => clearFieldError('Name')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Name
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="Your name"
        />
        {fieldErrors.Name && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-3">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={() => clearFieldError('Email')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Email
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="your@email.com"
        />
        {fieldErrors.Email && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-lg font-medium text-gray-900 mb-3">
          Phone *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          onChange={() => clearFieldError('Phone')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Phone
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="123-456-7890"
        />
        {fieldErrors.Phone && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Phone}</p>
        )}
      </div>

      {/* Experience */}
      <div>
        <label htmlFor="experience" className="block text-lg font-medium text-gray-900 mb-3">
          What are the most interesting things you have done in the past? *
        </label>
        <textarea
          id="experience"
          name="experience"
          required
          rows={4}
          onChange={() => clearFieldError('Experience')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Experience
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="Tell us about the most interesting things you've worked on..."
        />
        {fieldErrors.Experience && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Experience}</p>
        )}
      </div>

      {/* Achievements */}
      <div>
        <label htmlFor="achievements" className="block text-lg font-medium text-gray-900 mb-3">
          What do you consider your biggest achievements? *
        </label>
        <textarea
          id="achievements"
          name="achievements"
          required
          rows={4}
          onChange={() => clearFieldError('Achievements')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Achievements
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="Share what you're most proud of accomplishing..."
        />
        {fieldErrors.Achievements && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Achievements}</p>
        )}
      </div>

      {/* Links (Optional) */}
      <div>
        <label htmlFor="links" className="block text-lg font-medium text-gray-900 mb-3">
          Links (Optional)
        </label>
        <textarea
          id="links"
          name="links"
          rows={3}
          onChange={() => clearFieldError('Links')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Links
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="Share links to your work, projects, portfolio, GitHub, LinkedIn, etc. (one per line)"
        />
        {fieldErrors.Links && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Links}</p>
        )}
      </div>

      {/* Interests */}
      <div>
        <label htmlFor="interests" className="block text-lg font-medium text-gray-900 mb-3">
          What excites you about robotics? *
        </label>
        <textarea
          id="interests"
          name="interests"
          required
          rows={4}
          onChange={() => clearFieldError('Interests')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Interests
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="What aspects of robotics are you most passionate about..."
        />
        {fieldErrors.Interests && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Interests}</p>
        )}
      </div>

      {/* Benefits */}
      <div>
        <label htmlFor="benefits" className="block text-lg font-medium text-gray-900 mb-3">
          What do you hope to gain from joining this lab? *
        </label>
        <textarea
          id="benefits"
          name="benefits"
          required
          rows={3}
          onChange={() => clearFieldError('Benefits')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none text-lg ${
            fieldErrors.Benefits
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900'
          }`}
          placeholder="What are you hoping to learn or achieve..."
        />
        {fieldErrors.Benefits && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.Benefits}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-0 focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Interest'}
        </button>

        {/* General Message */}
        {generalMessage && (
          <p className={`mt-4 text-center text-lg font-medium ${
            generalMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {generalMessage.text}
          </p>
        )}
      </div>
    </form>
  );
}
