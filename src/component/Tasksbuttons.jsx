import { Link } from "react-router-dom";

const TaskButtons = () => {
    const tasks = Array.from({ length: 7 }, (_, index) => index + 1);

    return (
        <div className="flex flex-wrap justify-center gap-4 p-6">
            {tasks.map((task) => (
                <Link key={task} to={`/task0${task}`} className="w-40">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition">
                        Task {task}
                    </button>
                </Link>
            ))}
        </div>
    );
};

export default TaskButtons;
