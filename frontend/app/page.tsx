

"use client";
import React, { useState } from 'react';
import axios from 'axios';


import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import ProgressBar from '../components/ProgressBar';
import ResultsDisplay from '../components/ResultsDisplay';
import Suggestions from '../components/Suggestions';

const API_BASE_URL = 'https://social-media-analyzer-45wb.onrender.com'; 

type Suggestion = {
    type: string;
    text: string;
};


export default function HomePage() {

    const [extractedText, setExtractedText] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [aiSuggestions, setAiSuggestions] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [fileType, setFileType] = useState<string>("");

    const resetState = () => {
        setExtractedText("");
        setSuggestions([]);
        setAiSuggestions("");
        setIsLoading(false);
        setIsAnalyzing(false);
        setError("");
        setUploadProgress(0);
        setFileType("");
    };

   
    const getRuleSuggestions = async (text: string) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/analyze/suggestions`, { text });
            setSuggestions(res.data.suggestions || []);
        } catch (err) {
            console.error("Failed to get rule-based suggestions:", err);
        }
    };

    const getAiSuggestions = async (text: string) => {
        setIsAnalyzing(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/analyze/ai-suggestions`, { text });
            setAiSuggestions(res.data.suggestions || "No AI suggestions were generated.");
        } catch (err: any) {
            console.error("Failed to get AI suggestions:", err);
            setError(err.response?.data?.error || "Failed to get AI analysis.");
        } finally {
            setIsAnalyzing(false);
        }
    };


    const handleFile = async (file: File) => {
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) { 
            setError("File size exceeds the 5MB limit. Please upload a smaller file.");
            return;
        }

        resetState();
        setIsLoading(true);

        const isPdf = file.type === 'application/pdf';
        const endpoint = isPdf ? 'pdf' : 'ocr';
        setFileType(isPdf ? 'PDF' : 'Image (OCR)');

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(`${API_BASE_URL}/api/extract/${endpoint}`, formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
                    setUploadProgress(percentCompleted);
                }
            });

            const text = res.data.text;
            if (text) {
                setExtractedText(text);
                getRuleSuggestions(text);
                getAiSuggestions(text);
            } else {
                setError("Could not extract any text from the document.");
            }

        } catch (err: any) {
            console.error("File processing failed:", err);
            setError(err.response?.data?.error || "An unexpected error occurred during file processing.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
            <main className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 space-y-6 transform transition-all flex flex-col flex-grow">
                <Header />
                
                {!extractedText ? (
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <FileUpload onFile={handleFile} disabled={isLoading || isAnalyzing} />
                        {isLoading && <div className="w-full max-w-2xl mt-4"><ProgressBar progress={uploadProgress} fileType={fileType} /></div>}
                    </div>
                ) : (
                    <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="w-full">
                            <ResultsDisplay text={extractedText} onReset={resetState} />
                        </div>
                        <div className="w-full">
                           <Suggestions 
                                ruleSuggestions={suggestions} 
                                aiSuggestions={aiSuggestions}
                                isAnalyzing={isAnalyzing} 
                            />
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="p-4 text-sm text-red-800 bg-red-100 dark:bg-red-900/20 dark:text-red-300 border-l-4 border-red-500 rounded-r-lg mt-4" role="alert">
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}
            </main>
        </div>
    );
}
