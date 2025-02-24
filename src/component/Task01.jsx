import React, { useState } from "react";

const Task01 = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [text, setText] = useState("");
    const [items, setItems] = useState(["Item 1", "Item 2"]);
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [sum, setSum] = useState(null);
    const [newItem, setNewItem] = useState("");

    const handleAddItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem]);
            setNewItem("");
        }
    };

    const calculateSum = () => {
        setSum(Number(num1) + Number(num2));
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">React Task 01 UI</h2>

                    <div className="text-center mb-4">
                        <button
                            className="px-6 py-3 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 transition-all duration-300"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? "Hide Element" : "Show Element"}
                        </button>
                    </div>
                    {isVisible && <p className="text-center text-gray-700 mb-4">This is a visible element Abhishek Yadav.</p>}

                    <div className="text-center mb-4">
                        <button
                            className="px-6 py-3 bg-green-500 text-white rounded-full w-full hover:bg-green-600 transition-all duration-300"
                            onClick={() => setIsDisabled(!isDisabled)}
                        >
                            Toggle Button State
                        </button>
                    </div>
                    <button
                        className={`px-6 py-3 mt-2 w-full rounded-full text-white ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                        disabled={isDisabled}
                    >
                        Click Me
                    </button>

                    <div className="mt-6">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type something..."
                            className="border border-gray-300 p-3 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-center text-gray-700">You typed: {text}</p>
                    </div>

                    <div className="mt-6">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Add new item..."
                            className="border border-gray-300 p-3 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="text-center">
                            <button
                                className="px-6 py-3 bg-purple-500 text-white rounded-full w-full hover:bg-purple-600 transition-all duration-300"
                                onClick={handleAddItem}
                            >
                                Add Item
                            </button>
                        </div>

                        <ul className="mt-4 list-disc pl-5 text-gray-700">
                            {items.map((item, index) => (
                                <li key={index} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sum Calculator</h3>
                        <input
                            type="number"
                            value={num1}
                            onChange={(e) => setNum1(e.target.value)}
                            placeholder="Enter first number"
                            className="border border-gray-300 p-3 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            value={num2}
                            onChange={(e) => setNum2(e.target.value)}
                            placeholder="Enter second number"
                            className="border border-gray-300 p-3 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="text-center mb-4">
                            <button
                                className="px-6 py-3 bg-yellow-500 text-white rounded-full w-full hover:bg-yellow-600 transition-all duration-300"
                                onClick={calculateSum}
                            >
                                Calculate Sum
                            </button>
                        </div>
                        {sum !== null && <p className="text-center text-gray-700">Sum: {sum}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Task01;
