import React, { useState } from 'react';

const Task02 = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <h2 className="text-2xl font-bold mb-4">Counter: {count}</h2>
            <div className="space-x-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                    onClick={() => setCount(count + 1)}
                >
                    Increase
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
                    onClick={() => setCount(count - 1)}
                >
                    Decrease
                </button>
                <button
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700"
                    onClick={() => setCount(0)}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Task02;