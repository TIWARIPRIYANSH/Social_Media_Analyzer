import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 mb-5">
                 Social Media Analyzer
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-0">
                Get Extracted-Text , rule-based feedback and expert AI-powered analysis.
            </p>
        </div>
    );
};

export default Header;

