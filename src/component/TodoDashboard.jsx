import React, { useState, useEffect } from "react";
import { addTask, getTasks, updateTask, logoutUser } from "../utilis/FirebaseData";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../utilis/FirebaseData";
import { onAuthStateChanged } from "firebase/auth";

const TodoDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "ToDo", // Default status
  });

  // Fetch tasks from Firebase
  const fetchTasks = async () => {
    const tasksData = await getTasks();
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchTasks();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Handle adding new tasks
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return; // Prevent empty tasks

    const task = {
      ...newTask,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    await addTask(task);
    setNewTask({ title: "", description: "", dueDate: "", priority: "Low", status: "ToDo" });
    fetchTasks();
  };

  // Handle Drag and Drop
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId; // Update the task status
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
    await updateTask(movedTask.id, { status: destination.droppableId });
  };

  // Filter tasks by status
  const filterTasksByStatus = (status) => tasks.filter(task => task.status === status);

  // Handle Logout
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todo Dashboard</h1>
        
        {/* User Profile Section */}
        {user && (
          <div className="flex items-center space-x-4 bg-white p-3 rounded shadow-md">
            <span className="font-semibold">{user.displayName || "User"}</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Task Form */}
      <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      {/* Task Lists */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ToDo List */}
          <Droppable droppableId="ToDo" type="task">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                <h2 className="font-semibold text-xl mb-4">ToDo List</h2>
                {filterTasksByStatus("ToDo").map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-4 rounded shadow-md border border-gray-200"
                      >
                        <h3 className="font-semibold text-xl">{task.title}</h3>
                        <p className="text-gray-600">{task.description}</p>
                        <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                        <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* In Progress List */}
          <Droppable droppableId="InProgress" type="task">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                <h2 className="font-semibold text-xl mb-4">In Progress</h2>
                {filterTasksByStatus("InProgress").map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-4 rounded shadow-md border border-gray-200"
                      >
                        <h3 className="font-semibold text-xl">{task.title}</h3>
                        <p className="text-gray-600">{task.description}</p>
                        <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                        <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Done List */}
          <Droppable droppableId="Done" type="task">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                <h2 className="font-semibold text-xl mb-4">Done Tasks</h2>
                {filterTasksByStatus("Done").map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white p-4 rounded shadow-md border border-gray-200">
                        <h3 className="font-semibold text-xl">{task.title}</h3>
                        <p className="text-gray-600">{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoDashboard;
