import type { MeetingName } from '../lib/supabase'

interface HallOfFameProps {
  topNames: MeetingName[]
}

export default function HallOfFame({ topNames }: HallOfFameProps) {
  if (topNames.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-lg p-6 mb-8 border-2 border-yellow-300">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">🏆</span>
        <h2 className="text-2xl font-bold text-gray-800">Hall of Fame</h2>
      </div>
      <div className="space-y-3">
        {topNames.map((name, index) => (
          <div
            key={name.id}
            className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-white font-bold text-lg">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{name.name}</h3>
              {name.category && (
                <span className="text-xs text-gray-600">{name.category}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xl">❤️</span>
              <span className="text-lg font-bold text-gray-700">{name.votes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
