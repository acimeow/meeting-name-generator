export type MeetingType = 'all' | 'brainstorm' | 'retro' | 'planning' | '1:1'

export async function generateMeetingNames(
  category: MeetingType = 'all',
  count: number = 8
): Promise<string[]> {
  try {
    const response = await fetch('/api/generate-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, count }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.names
  } catch (error) {
    console.error('Error generating names:', error)
    throw error
  }
}
