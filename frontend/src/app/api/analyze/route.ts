import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    console.log("[Data]: ", data)
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const prompt = `You are an expert sales strategist who follows modern, human-first cold calling principles (non-pushy, conversational, value-driven).

Analyze this business lead:
Name: ${data.name}
Category: ${data.category}
Rating: ${data.rating}
Reviews: ${data.reviews}
Website: ${data.website || 'None'}
Phone: ${data.phone || 'None'}

Please provide:

1. Lead Insight:
A short, sharp observation about what they are missing or where they are weak.

2. What to Sell:
The most relevant service to help them improve (simple and clear).

3. Competitor:
Provide the name of a real, specific competitor in the same area. If you are not 100% sure of a specific name, return "Top-rated nearby competitors".

4. Cold Call Script:
Write a highly specific, data-driven cold call script (approx 150-180 words).

Script MUST follow this data-driven structure:
- Professional Opening (10s): Casual but business-ready.
- Data Reference (15s): Mention their REAL stats (e.g., "I saw you have ${data.reviews} reviews with a ${data.rating} rating").
- Specific Problem (15s): Connect their data to a gap (e.g., "With that many reviews, missing a ${data.website ? 'modern booking system' : 'website'} is likely costing you 20% in direct leads").
- Opportunity & Solution (15s): Explain how your service turns that gap into profit.
- Low-Pressure Close (5s): A simple question to start a chat.

Tone rules:
- No generic templates. Use the specific business category and location context.
- Sound like a researcher who found a genuine opportunity for them.

Return ONLY a JSON object with keys:
leadInsight, whatToSell, competitor, coldCallScript.
Do not include any extra text.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600,
        temperature: 0.6,
        response_format: { type: "json_object" }
      })
    });

    const json = await response.json();
    const content = JSON.parse(json.choices?.[0]?.message?.content || '{}');

    return NextResponse.json(content);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json({ error: 'Failed to analyze lead' }, { status: 500 });
  }
}
