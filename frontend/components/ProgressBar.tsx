import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number;
    fileType: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, fileType }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <motion.div
                className="bg-indigo-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {progress > 10 ? `Uploading ${fileType}... ${progress}%` : ''}
            </motion.div>
        </div>
    );
};

export default ProgressBar;
