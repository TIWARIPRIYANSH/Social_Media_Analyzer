import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- SVG Icons ---
const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 21V11a4 4 0 00-4-4H8a4 4 0 00-4 4v1.586A2 2 0 005.414 17h13.172a2 2 0 001.414-1.414V15a4 4 0 00-4-4h-1a4 4 0 00-4 4v6z" /></svg>;


interface SuggestionsProps {
    ruleSuggestions: { type: string; text: string }[];
    aiSuggestions: string;
    isAnalyzing: boolean;
}

const Suggestions = ({ ruleSuggestions, aiSuggestions, isAnalyzing }: SuggestionsProps) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 h-full flex flex-col">
            {/* Rule-Based Suggestions Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700"
            >
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                    <LightbulbIcon/> Quick Suggestions
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {ruleSuggestions.length > 0 ? (
                        ruleSuggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion.text}</li>
                        ))
                    ) : (
                        <li>No quick suggestions.</li>
                    )}
                </ul>
            </motion.div>

            {/* AI-Powered Suggestions Section (Scrollable) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-4 flex-grow overflow-y-auto"
            >
                 <h2 className="font-semibold text-lg text-indigo-800 dark:text-indigo-200 mb-2">
                    🤖 AI-Powered Analysis
                </h2>
                {isAnalyzing && (
                    <div className="flex items-center justify-center p-4 text-sm font-medium text-white bg-indigo-500 rounded-lg">
                        <SpinnerIcon />
                        Analyzing with AI...
                    </div>
                )}
                {aiSuggestions && (
                     <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-md">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiSuggestions}</ReactMarkdown>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Suggestions;
