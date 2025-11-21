import { useState } from 'react'
import { useMeetingNames, useAddMeetingName, useVoteMeetingName } from '../hooks/useMeetingNames'
import { generateMeetingNames, type MeetingType } from '../services/nameGenerator'
import MeetingNameCard from './MeetingNameCard'
import HallOfFame from './HallOfFame'

export default function MeetingNameGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<MeetingType>('all')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: meetingNames = [], isLoading } = useMeetingNames()
  const addMeetingName = useAddMeetingName()
  const voteMeetingName = useVoteMeetingName()

  // Get top 5 most voted names for Hall of Fame
  const topNames = [...meetingNames]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5)
    .filter((name) => name.votes > 0)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const names = await generateMeetingNames(selectedCategory, 8)

      // Add each name to the database
      for (const name of names) {
        await addMeetingName.mutateAsync({
          name,
          category: selectedCategory === 'all' ? null : selectedCategory,
        })
      }
    } catch (err) {
      console.error('Error generating names:', err)
      setError('Failed to generate names. Please check your API key and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleVote = (id: string) => {
    voteMeetingName.mutate(id)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <span className="text-lg">📋</span>
              Meeting Type:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as MeetingType)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              disabled={isGenerating}
            >
              <option value="all">All Types</option>
              <option value="brainstorm">Brainstorm</option>
              <option value="retro">Retrospective</option>
              <option value="planning">Planning</option>
              <option value="1:1">One-on-One</option>
            </select>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>✨</span>
                  Generate Names
                </span>
              )}
            </button>

            {meetingNames.length > 0 && (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 md:flex-none px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              >
                <span className="flex items-center gap-2">
                  <span>➕</span>
                  Generate More
                </span>
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Hall of Fame */}
      {topNames.length > 0 && <HallOfFame topNames={topNames} />}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600 text-lg">Loading meeting names...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && meetingNames.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Ready to Generate Amazing Meeting Names?
          </h3>
          <p className="text-gray-600">
            Click "Generate Names" to get started with creative, fun meeting titles!
          </p>
        </div>
      )}

      {/* Meeting Names Grid */}
      {meetingNames.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              All Names ({meetingNames.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetingNames.map((name) => (
              <MeetingNameCard
                key={name.id}
                meetingName={name}
                onVote={handleVote}
                isVoting={voteMeetingName.isPending}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
