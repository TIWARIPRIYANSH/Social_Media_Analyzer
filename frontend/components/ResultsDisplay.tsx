import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- SVG Icons ---
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
    </svg>
);
const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
        <path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.5 12.5"/><path d="M2 12.5a10 10 0 0 0 18.5-1"/>
    </svg>
);

interface ResultsDisplayProps {
    text: string;
    onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ text, onReset }) => {
    const [copyStatus, setCopyStatus] = useState("Copy");

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus("Copied!");
            setTimeout(() => setCopyStatus("Copy"), 2000);
        }, () => {
            setCopyStatus("Failed!");
        });
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 h-full flex flex-col"
        >
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Extracted Text:</h2>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={handleCopy}
                        className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        <CopyIcon />
                        {copyStatus}
                    </button>
                     <button 
                        onClick={onReset}
                        className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-colors"
                    >
                        <ResetIcon />
                        Start Over
                    </button>
                </div>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-md overflow-y-auto font-mono flex-grow max-h-[70vh]">
                {text}
            </pre>
        </motion.div>
    );
};

export default ResultsDisplay;
