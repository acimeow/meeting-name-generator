import { useState } from 'react'
import type { MeetingName } from '../lib/supabase'

interface MeetingNameCardProps {
  meetingName: MeetingName
  onVote: (id: string) => void
  isVoting?: boolean
}

export default function MeetingNameCard({ meetingName, onVote, isVoting }: MeetingNameCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleVote = () => {
    setIsAnimating(true)
    onVote(meetingName.id)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {meetingName.name}
          </h3>
          {meetingName.category && (
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              {meetingName.category}
            </span>
          )}
        </div>
        <button
          onClick={handleVote}
          disabled={isVoting}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            isAnimating
              ? 'scale-110 bg-red-500 text-white'
              : 'bg-gray-100 hover:bg-red-50 text-gray-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span className="text-2xl">{isAnimating ? '❤️' : '🤍'}</span>
          <span className="text-sm font-semibold">{meetingName.votes}</span>
        </button>
      </div>
    </div>
  )
}
