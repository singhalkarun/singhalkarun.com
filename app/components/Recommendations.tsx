interface Recommendation {
  name: string;
  title: string;
  company: string;
  content: string;
  date?: string;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Recommendations</h2>
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="border-l-4 pl-4 border-blue-600">
            <div className="mb-3">
              <p className="text-sm sm:text-base leading-relaxed italic text-gray-700">
                &ldquo;{rec.content}&rdquo;
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-sm sm:text-base text-gray-900">
                  {rec.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {rec.title} at {rec.company}
                </p>
              </div>
              {rec.date && (
                <p className="text-xs text-gray-500 mt-1 sm:mt-0">
                  {rec.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

