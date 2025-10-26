# SophoTravel

A modern cultural travel platform that connects travelers with authentic destinations through AI-powered guidance and meaningful travel experiences.

## Overview

SophoTravel helps travelers discover genuine cultural experiences by combining intelligent AI assistance with curated destination information. The platform provides personalized travel recommendations, cultural insights, and practical advice through an interactive chatbot, making authentic wanderlust accessible to everyone.

## Features

**AI Travel Assistant**
- Intelligent chatbot powered by Google Gemini 2.5 Flash
- Personalized travel recommendations based on user preferences
- Bilingual support (English and Vietnamese)
- Cultural insights and practical travel advice
- Structured responses with concise bullet points

**Conversation Management**
- Persistent chat history across sessions using localStorage
- AI-generated conversation titles for easy navigation
- Sidebar interface for browsing past conversations
- Create new chats and delete old ones seamlessly

**Modern User Interface**
- Full-height responsive chat layout
- Smooth animations and transitions
- Professional SaaS-inspired design
- Quick action buttons for common queries
- Real-time typing indicators

**Cultural Focus**
- Emphasis on authentic local experiences
- Hidden gems and off-the-beaten-path destinations
- Cultural heritage and traditions
- Local market recommendations
- Sustainable and responsible travel practices

## Tech Stack

**Frontend**
- React 19.1.1
- Vite (Rolldown) for fast development
- Tailwind CSS 4.1.16 for styling
- React Router DOM 7.9.4 for navigation
- Lucide React for icons

**AI & APIs**
- Google Generative AI (Gemini 2.5 Flash)
- Google OAuth for authentication

**Storage**
- Browser localStorage for conversation persistence

## Installation

Clone the repository:

```bash
git clone https://github.com/SahilGupta721/NewHacks-2025.git
cd NewHacks-2025/frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_SERPAPI_KEY=your_serpapi_key
```

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Usage

**Starting a Conversation**

1. Navigate to the AI Assistant page
2. Use quick action buttons or type your own question
3. Receive personalized travel recommendations

**Managing Conversations**

- Click "Show History" to view past conversations
- Select any conversation to continue where you left off
- Click "New Chat" to start a fresh conversation
- Hover over a conversation and click the trash icon to delete

**Getting Recommendations**

Ask SophoBot about:
- Best destinations for cultural travel
- Hidden gems and local experiences
- Authentic food and markets
- Travel safety and etiquette tips
- Best times to visit specific locations

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── common/          # Reusable components (Navbar, Footer)
│   ├── pages/
│   │   ├── SupportPage.jsx  # AI chatbot interface
│   │   └── StoriesPage.jsx  # About page
│   └── App.jsx
├── public/
└── package.json
```

## Environment Variables

The application requires the following environment variables:

- `VITE_GEMINI_API_KEY` - Google Gemini API key for AI chatbot
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_SERPAPI_KEY` - SerpAPI key for search functionality

Obtain your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

## Learning Outcomes

This project demonstrates:

- Integration of modern AI APIs (Google Gemini) in React applications
- State management with React hooks and localStorage
- Building responsive and accessible user interfaces
- Implementing conversation history and context management
- Creating professional SaaS-style designs with Tailwind CSS
- Developing bilingual applications with smart language detection

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## Team

**Development Team**
- Bruce Vo
- Sahil Gupta
- Divroop Kaur Sandhu
- KseniaTk

## Acknowledgements

This project uses the following technologies and services:

- **Google Gemini AI** for intelligent travel recommendations
- **Tailwind CSS** for rapid UI development
- **Lucide** for beautiful open-source icons
- **Vite** for lightning-fast development experience
- **Vercel** for seamless deployment and hosting

Special thanks to the open-source community for providing excellent tools and libraries that made this project possible.

## License

This project is part of NewHacks 2025 hackathon submission.

---

Built with passion for authentic travel experiences.
