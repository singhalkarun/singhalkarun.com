"use client";

import Link from 'next/link';

export default function BlogsHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 pt-6 pb-6 mb-12">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-200"
        >
          Karun Agarwal
        </Link>
      </div>
    </header>
  );
}
