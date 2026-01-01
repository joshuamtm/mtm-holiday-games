// Supabase Edge Function: moderate-review
// Checks if a review comment is appropriate for a family-friendly site
// Uses Claude Haiku for fast, cheap moderation

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

interface ModerationRequest {
  text: string;
}

interface ModerationResponse {
  approved: boolean;
  reason?: string;
}

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { text }: ModerationRequest = await req.json();

    // If no text provided or text is empty, approve
    if (!text || text.trim().length === 0) {
      return jsonResponse({ approved: true });
    }

    // If Anthropic API key is not configured, approve (fail open for MVP)
    if (!ANTHROPIC_API_KEY) {
      console.warn("ANTHROPIC_API_KEY not configured, approving review");
      return jsonResponse({ approved: true });
    }

    // Call Claude Haiku for moderation
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 150,
        messages: [
          {
            role: "user",
            content: `You are a content moderator for a family-friendly holiday game website.
Review the following user comment and determine if it's appropriate to publish.

REJECT if the comment contains:
- Profanity or obscene language
- Personal attacks or harassment
- Spam or promotional content
- Contact information (emails, phone numbers)
- Inappropriate content for children
- Hate speech or discrimination

APPROVE if the comment is:
- A genuine game review or feedback
- Appropriate for all ages
- Constructive or positive

User comment: "${text}"

Respond with ONLY valid JSON, no other text:
{"approved": true/false, "reason": "brief reason if rejected"}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Anthropic API error:", await response.text());
      // Fail open - approve if API fails
      return jsonResponse({ approved: true });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      console.error("No content in response");
      return jsonResponse({ approved: true });
    }

    // Parse the JSON response from Claude
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("No JSON found in response:", content);
        return jsonResponse({ approved: true });
      }

      const result: ModerationResponse = JSON.parse(jsonMatch[0]);
      return jsonResponse(result);
    } catch (parseError) {
      console.error("Failed to parse moderation response:", content);
      return jsonResponse({ approved: true });
    }
  } catch (error) {
    console.error("Moderation error:", error);
    // Fail open on errors
    return jsonResponse({ approved: true });
  }
});

function jsonResponse(data: ModerationResponse): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
