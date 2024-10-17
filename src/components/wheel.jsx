import React, { useState } from 'react';

const SpinningWheel = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8'];

    const spinWheel = () => {
        setIsSpinning(true);
        const spinTime = Math.floor(Math.random() * 4000) + 4000; // Random time between 4-8 seconds
        setTimeout(() => {
            setIsSpinning(false);
        }, spinTime);
    };

    return (
        <div className="w-64 h-64 bg-gray-200 relative" onClick={spinWheel}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg className="w-16 h-16 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            {options.map((option, index) => (
                <div
                    key={option}
                    className={`absolute w-16 h-16 p-16 border border-gray-800 text-center flex items-center justify-center text-gray-800 font-bold ${isSpinning ? 'rotate-180' : 'rotate-0'} transition-all duration-500`}
                    style={{ transform: `rotate(${index * 45}deg)` }}
                >
                    {option}
                </div>
            ))}
        </div>
    );
};

export default SpinningWheel;