import Anthropic from '@anthropic-ai/sdk'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { category = 'all', count = 8 } = req.body

    const categoryPrompts: Record<string, string> = {
      all: 'Generate creative, humorous meeting names for product managers and tech teams. Include wordplay, tech references, and fun twists on common meeting types.',
      brainstorm: 'Generate creative, humorous names for brainstorming sessions. Focus on ideation, creativity, and innovation themes with playful wordplay.',
      retro: 'Generate creative, humorous names for retrospective meetings. Include references to reflection, improvement, and team dynamics with a fun twist.',
      planning: 'Generate creative, humorous names for planning meetings. Focus on strategy, roadmaps, and organization with witty product management references.',
      '1:1': 'Generate creative, humorous names for one-on-one meetings. Include themes about feedback, growth, coffee chats, and personal connection with playful language.',
    }

    const prompt = `${categoryPrompts[category] || categoryPrompts.all}

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

    // Parse the response
    const names = content.text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^[\d\-\*\•]+\.?\s*/, '').trim())
      .filter((line) => line.length > 0)
      .slice(0, count)

    return res.status(200).json({ names })
  } catch (error) {
    console.error('Error generating names:', error)
    return res.status(500).json({
      error: 'Failed to generate names',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
