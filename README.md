# Social_Media_Analyzer
A project with blend of AI/Ml to extract text from pdf and use OCR to infer images and improve them using AI and ML .

Social Media Content Analyzer

A full-stack web application designed to help users enhance their social media content by providing instant, dual-layered feedback using both rule-based checks and expert-level AI analysis.

Live Application URL: https://social-media-analyzer-sigma.vercel.app/
Features

    Dual Document Upload: Supports both PDF and Image (PNG, JPG) files via a drag-and-drop interface.

    Multi-Engine Text Extraction: Uses pdf-parse for PDFs and Tesseract.js for OCR on images.

    File Size Limiting: Securely rejects files larger than 5MB on both the client and server.

    Two-Tiered Analysis:

        Quick Wins: Instant, rule-based suggestions for common improvements (CTAs, hashtags).

        Expert AI Analysis: In-depth, contextual feedback from Google's Gemini AI, formatted for clarity.

    Responsive UI: A clean, modern, and responsive side-by-side layout for comparing original text and suggestions.

    User Experience: Features include an upload progress bar, loading states for analysis, and smooth animations powered by Framer Motion.

Tech Stack
Frontend

    Framework: Next.js 14 (App Router)

    Language: TypeScript

    Styling: Tailwind CSS

    Animations: Framer Motion

    API Communication: Axios

Backend

    Framework: Node.js & Express

    File Handling: Multer

    Text Extraction: pdf-parse, tesseract.js

    AI Integration: Google Generative AI (gemini-1.5-flash)

    Environment: dotenv, cors

Deployment

The application is deployed with a decoupled architecture for maximum scalability and reliability:

    Backend (Node.js/Express): Deployed on Render.

    Frontend (Next.js): Deployed on Vercel.

Getting Started (Local Setup)

To run this project locally, you will need two separate terminal windows.

Prerequisites:

    Node.js (v18 or later)

    Git

1. Clone the repository:

git clone [https://github.com/TIWARIPRIYANSH/Social_Media_Analyzer.git](https://github.com/TIWARIPRIYANSH/Social_Media_Analyzer.git)
cd Social_Media_Analyzer

2. Setup the Backend:

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file and add your Google API key
echo "GOOGLE_API_KEY=YOUR_API_KEY_HERE" > .env

# Start the backend server
npm start

The backend will be running at http://localhost:3001.

3. Setup the Frontend:

# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

The frontend will be running at http://localhost:3000.
