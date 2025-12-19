# Grammy-AI

**AI-Powered Content Optimization for Social Media & Professional Communication**

Grammy-AI is an intelligent writing assistant that transforms your rough thoughts into polished, platform-optimized content. Whether you're crafting tweets, LinkedIn posts, emails, or just need grammar corrections, Grammy-AI adapts your message to the perfect tone and style for each platform.

## Features

### **Platform-Specific Optimization**

- **Twitter/X**: Punchy, engaging tweets with character optimization
- **LinkedIn**: Professional posts with strategic formatting and CTAs
- **Instagram**: Compelling captions with mobile-friendly structure
- **Email**: Clear, professional communication with proper structure
- **Grammar Check**: Clean up errors while preserving your voice

### **Smart Tone Adjustment**

- Casual, Professional, Friendly, and more
- Context-aware refinement based on your additional notes
- Maintains your authentic voice while improving clarity

### **Real-Time Processing**

- Instant AI-powered refinement using Perplexity's Sonar Pro model
- Smart debouncing and caching to optimize performance
- Seamless copy-to-clipboard and direct social media sharing

### **User Management**

- NextAuth integration with Google/GitHub login
- Anonymous usage with limited credits
- Chat history tracking for registered users
- PostgreSQL database with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **AI Integration**: Vercel AI SDK, Perplexity API
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel-ready with optimized builds

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Perplexity API key
- NextAuth providers (Google/GitHub) [optional]

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/grammy-ai.git
    cd grammy-ai
    ```

2. **Install dependencies**

    ```bash
    bun install
    # or
    npm install
    ```

3. **Set up environment variables**
   Create a `.env.local` file:

    ```env
    DATABASE_URL="postgresql://username:password@localhost:5432/grammyai"
    PERPLEXITY_API_KEY="your_perplexity_api_key"
    NEXTAUTH_SECRET="your-secret-key"
    NEXTAUTH_URL="http://localhost:3000"

    # Optional: OAuth providers
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    GITHUB_ID="your_github_id"
    GITHUB_SECRET="your_github_secret"
    ```

4. **Set up the database**

    ```bash
    bun run prisma:generate
    npx prisma migrate deploy
    ```

5. **Start the development server**

    ```bash
    bun dev
    # or
    npm run dev
    ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Enter your message** in the text area
2. **Select platform** (Twitter/X, LinkedIn, Instagram, Email, or Grammar Check)
3. **Choose tone** (Casual, Professional, Friendly, etc.)
4. **Add context** (optional) to provide additional information
5. **Click submit** to get AI-optimized content
6. **Copy result** or share directly to social platforms

### Example Transformation

**Input:** "learned nextjs building this project was fun but api rate limits sucked"

**Twitter Output:** "Just wrapped up building my first Next.js project! The learning curve was totally worth it, but man, those API rate limits really tested my patience. Anyone else been through the same struggle?"

## The Story Behind Grammy-AI

As someone who spends countless hours on social media, I was constantly battling grammar mistakes and tone inconsistencies. The final straw came during a late-night coding session when I posted a tweet with an embarrassing typo that my entire tech community noticed.

### The Problem

- **Time-consuming**: Manually proofreading hundreds of posts
- **Inconsistent quality**: Grammar errors slipping through
- **Platform confusion**: Different tones needed for Twitter vs LinkedIn
- **Workflow friction**: Switching between tools constantly

### The Solution

Grammy-AI was born during winter break, with 3-4 hours daily dedicated to development. What started as basic regex patterns evolved into a sophisticated AI-powered platform that understands context, tone, and platform-specific requirements.

## Development Journey

- Started learning Next.js and used it as the foundation for this project
- Initial prototype used basic regex patterns, quickly realized need for AI integration
- Breakthrough came with platform-specific optimization features for Twitter and LinkedIn
- Dedicated 3-4 hours daily during winter break to development

## Key Learnings & Challenges

### Problems Solved

- **API Rate Limiting**: Struggled with OpenAI's rate limits during peak usage, solved with request queuing and caching
- **Real-time Processing**: Optimized debouncing and smart caching to reduce API calls without sacrificing UX
- **Context Understanding**: Required extensive prompt engineering to distinguish Twitter vs LinkedIn tone
- **Cost Management**: Balanced feature richness with API costs while maintaining fast response times

### Development Insights

- **User-Centered Design**: Initially focused too much on technical features, learned to prioritize actual user workflow
- **API Management**: Mastered cost optimization and performance balance
- **Feedback Integration**: Getting feedback from fellow developers and creators was crucial for interface redesign
- **Authentic Problem Solving**: Best tools solve problems you personally face daily - authenticity drives better solutions

## API Routes

- `POST /api/chat` - Process and refine messages with AI
- `GET /api/chat` - Retrieve user chat history
- `/api/auth/*` - NextAuth authentication endpoints
- `GET /api/credits` - Check remaining credits for anonymous users

## Contributing

Contributions are welcome! Feel free to:

- Report bugs or request features
- Submit pull requests
- Improve documentation
- Share feedback from your usage

## License

This project is open source and available under the [MIT License](LICENSE).
