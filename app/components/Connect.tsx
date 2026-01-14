"use client";

import { useState } from "react";
import { submitForm } from "../actions/submitForm";
import { content } from "../data/content";
import { useMode } from "../contexts/ModeContext";

export default function Connect() {
  const { mode } = useMode();
  const currentContent = content[mode];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const result = await submitForm(formData);
      setMessage({ type: 'success', text: result.message });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" className="mt-24">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
        {currentContent.connect.title}
      </h3>
      
      <div> 
        <p className="text-xl lg:text-2xl leading-relaxed text-gray-800 mb-12">
          {currentContent.connect.description}
        </p>

        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Book/Article/Podcast Question */}
          <div>
            <label htmlFor="book" className="block text-lg font-medium text-gray-900 mb-3">
              {currentContent.connect.bookQuestion}
            </label>
            <textarea
              id="book"
              name="book"
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:ring-gray-900 focus:border-gray-900 text-lg"
              placeholder={currentContent.connect.bookPlaceholder}
            />
          </div>

          {/* Interest Question */}
          <div>
            <label htmlFor="interest" className="block text-lg font-medium text-gray-900 mb-3">
              {currentContent.connect.interestQuestion}
            </label>
            <textarea
              id="interest"
              name="interest"
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:ring-gray-900 focus:border-gray-900 text-lg"
              placeholder={currentContent.connect.interestPlaceholder}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-3">
              {currentContent.connect.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:ring-gray-900 focus:border-gray-900 text-lg"
              placeholder={currentContent.connect.emailPlaceholder}
            />
          </div>

          {/* Phone (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-900 mb-3">
              {currentContent.connect.phoneLabel}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:ring-gray-900 focus:border-gray-900 text-lg"
              placeholder={currentContent.connect.phonePlaceholder}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || message !== null}
              className={`w-full py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-0 focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                message 
                  ? message.type === 'success'
                    ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-700'
                    : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600'
                  : 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900'
              }`}
            >
              {isSubmitting 
                ? currentContent.connect.submittingText 
                : message 
                  ? message.text 
                  : currentContent.connect.submitButton
              }
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
