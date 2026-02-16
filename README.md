# Song Blueprint Generator

A web application that helps musicians and producers create detailed song blueprints with the assistance of AI. The tool allows users to specify various aspects of their song including genre, production style, instruments, vocal characteristics, and more.

## Features

- **Genre Selection**: Choose from multiple base genres like Pop, Rock, Hip Hop, Electronic, etc.
- **Production Styles**: Select from styles like Radio-Ready, Lo-Fi, Cinematic, etc.
- **Style DNA Tags**: Select multiple sub-genres to define the song's style DNA
- **Instrument Selection**: Choose from various instruments that will be featured in the song
- **Vocal Characteristics**: Define vocal qualities like Bright, Airy, Powerful Belt, etc.
- **AI-Powered Concept Improvement**: Enhance your song concept with AI assistance
- **Blueprint Generation**: Create a comprehensive blueprint for your song

## How to Use

1. Describe your song concept in the text area
2. Click "Improve with AI" to enhance your concept (requires API key)
3. Select your base genre and production style
4. Choose relevant style DNA tags, instruments, and vocal characteristics
5. Adjust settings like weirdness level and style influence
6. Click "Generate Blueprint" to create your song blueprint
7. Copy the generated blueprint to your clipboard

## AI Integration

This application uses OpenRouter's API for AI-powered concept improvement. To use this feature:

1. Get a free API key from [OpenRouter](https://openrouter.ai/keys)
2. Enter your API key when prompted
3. Use the "Improve with AI" button to enhance your song concept

## Running Locally

While this application is designed to run in the browser without a backend, you can also run it locally:

```bash
git clone <repository-url>
cd song-blueprint-generator
npm install
npm run dev
```

Then visit `http://localhost:3000` in your browser.

## Deployment

This application is optimized for GitHub Pages deployment. The build process creates static files that can be served directly from GitHub Pages.

## Technologies Used

- React
- Framer Motion (for animations)
- Tailwind CSS
- Vite (build tool)
- OpenRouter API (for AI features)

## Contributing

Feel free to submit issues or pull requests to improve the functionality or design of this tool.