import { commonSchemas, createSchema } from "../schemas/common.js";
import { SpotifyService } from "../../spotify.js";

export const userTools = {
  get_user_profile: {
    title: "Get User Profile",
    description: `Retrieve comprehensive information about the current Spotify user's profile, preferences, and account details.

🎯 USE CASES:
• Display user information in music applications and dashboards
• Personalize music experiences based on user demographics
• Verify user identity and account status for features
• Build user profiles for music recommendation systems
• Create personalized greetings and user interfaces

📝 WHAT IT RETURNS:
• User display name, real name, and profile images
• Country/market information for content availability
• Follower count and public profile statistics
• Account type (free, premium) and subscription status
• External URLs and social media links
• User preferences and privacy settings

🔍 EXAMPLES:
• "Show me my Spotify profile information"
• "Get my account details and subscription status"
• "What's my display name and profile picture?"
• "Check my country setting and follower count"

👤 PROFILE INSIGHTS:
• Essential for personalizing user experiences
• Helps tailor content and recommendations
• Useful for subscription-based feature access
• Perfect for building user identity systems
• Great for social features and sharing

💡 PERSONALIZATION OPPORTUNITIES:
• Customize interfaces based on user preferences
• Adjust content recommendations by market/country
• Display appropriate subscription features
• Build social connections using profile information
• Create personalized music discovery experiences

🔒 PRIVACY CONSIDERATIONS:
• Respects user privacy settings and preferences
• Shows only publicly available information
• Account for different privacy levels across users
• Some information may be limited based on settings

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-read-private scope
• User must have an active Spotify account`,

    schema: createSchema({
      token: commonSchemas.token(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token } = args;
      return await spotifyService.getUserProfile(token);
    },
  },
};
