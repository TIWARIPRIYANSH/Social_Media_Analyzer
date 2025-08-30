const pdf = require('pdf-parse');
const tesseract = require('tesseract.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

//const sentiment = new Sentiment();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


// --- File Extraction Logic ---
const extractPdf = async (req, res) => {

    try {
        if (!req.file) return res.status(400).json({ error: 'No file was uploaded.' });
        const pdfData = await pdf(req.file.buffer);
  
        res.status(200).json({ text: pdfData.text });
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: 'Failed to process the PDF file.' });
    }
};

const extractOcr = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
        const { data: { text } } = await tesseract.recognize(req.file.buffer, 'eng');
        res.status(200).json({ text });
    } catch (error) {
        console.error('OCR processing error:', error);
        res.status(500).json({ error: 'An error occurred during OCR processing.' });
    }
};


// --- Rule-Based Analysis Logic ---
const getSuggestions = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'No text provided for analysis.' });
        const suggestions = [];
        const ctaKeywords = ['learn more', 'shop now', 'sign up', 'download', 'click here', 'comment below', 'link in bio'];
        if (!ctaKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
            suggestions.push({ type: 'engagement', text: 'Consider adding a clear Call to Action (CTA) to prompt user interaction.' });
        }
        const hashtags = text.match(/#[a-zA-Z0-9_]+/g) || [];
        if (hashtags.length === 0) {
            suggestions.push({ type: 'engagement', text: 'Add a few relevant hashtags to increase discoverability.' });
        }
        res.status(200).json({ suggestions });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'An error occurred during text analysis.' });
    }
};

// --- AI-Powered Analysis Logic (UPDATED) ---
const getAiSuggestions = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'No text provided for AI analysis.' });
        }
        if (!process.env.GOOGLE_API_KEY) {
            return res.status(500).json({ error: 'AI API key is not configured on the server.' });
        }

        const prompt = `
            As a world-class social media strategist, your task is to analyze the following post and provide expert recommendations to maximize its engagement, clarity, and impact.

            **Original Post:**
            ---
            ${text}
            ---

            Please provide your analysis in the following Markdown format:

            **Overall Feedback:** (Provide a brief, encouraging summary of the post's strengths and areas for improvement.)

            **Tone & Sentiment:** (Describe the perceived tone and sentiment of the post. Is it professional, casual, enthusiastic, etc.?)

            **Actionable Rewrite Suggestion:** (Offer one specific, rewritten version of the post that is more engaging or impactful.)

            **Hashtag Strategy:** (Suggest 3-5 relevant hashtags, explaining why they are a good fit. Include a mix of broad and niche tags if possible.)

            **Call to Action (CTA) Idea:** (If a CTA is weak or missing, suggest a stronger one.)
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiText = response.text();
        
        res.status(200).json({ suggestions: aiText });

    } catch (error) {
        console.error('AI analysis error:', error);
        res.status(500).json({ error: 'An error occurred during AI analysis.' });
    }
};


module.exports = {
    extractPdf,
    extractOcr,
    getSuggestions,
    getAiSuggestions,
};
