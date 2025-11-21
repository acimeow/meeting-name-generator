import Anthropic from '@anthropic-ai/sdk'

function getAnthropicClient() {
  const rawApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  const apiKey = rawApiKey?.trim().replace(/[\n\r\t]/g, '')

  if (!apiKey) {
    throw new Error('Missing VITE_ANTHROPIC_API_KEY environment variable')
  }

  // Create a new client instance each time to avoid initialization issues
  return new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  })
}

export type MeetingType = 'all' | 'brainstorm' | 'retro' | 'planning' | '1:1'

const categoryPrompts: Record<MeetingType, string> = {
  all: 'Generate creative, humorous meeting names for product managers and tech teams. Include wordplay, tech references, and fun twists on common meeting types.',
  brainstorm: 'Generate creative, humorous names for brainstorming sessions. Focus on ideation, creativity, and innovation themes with playful wordplay.',
  retro: 'Generate creative, humorous names for retrospective meetings. Include references to reflection, improvement, and team dynamics with a fun twist.',
  planning: 'Generate creative, humorous names for planning meetings. Focus on strategy, roadmaps, and organization with witty product management references.',
  '1:1': 'Generate creative, humorous names for one-on-one meetings. Include themes about feedback, growth, coffee chats, and personal connection with playful language.',
}

export async function generateMeetingNames(
  category: MeetingType = 'all',
  count: number = 8
): Promise<string[]> {

  const prompt = `${categoryPrompts[category]}

Requirements:
- Generate exactly ${count} unique meeting names
- Each name should be 2-6 words long
- Be creative, witty, and fun
- Include puns, alliteration, or clever wordplay
- Make them memorable and conversation-worthy
- Output ONLY the meeting names, one per line, no numbers or bullets

Examples:
- The Synergy Circus
- Async Await & Coffee
- Sprint to Conclusions
- The Bikeshedding Hour
- Retrospective Reckoning
- All Hands on Deck (Literally)

Now generate ${count} NEW creative meeting names:`

  try {
    const anthropic = getAnthropicClient()
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Parse the response - split by newlines and filter out empty lines
    const names = content.text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        // Remove leading numbers, bullets, or dashes
        return line.replace(/^[\d\-\*\•]+\.?\s*/, '').trim()
      })
      .filter((line) => line.length > 0)
      .slice(0, count)

    return names
  } catch (error) {
    console.error('Detailed error:', error)
    throw error
  }
}
