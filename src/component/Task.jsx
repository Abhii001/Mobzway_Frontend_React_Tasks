import React from "react";
import { useSortable } from "@dnd-kit/sortable";

function Task({ id, content }) {
  const { setNodeRef, attributes, listeners, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`task-item bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer transition-all ${
        isDragging ? "bg-blue-300 shadow-xl transform scale-105" : "bg-blue-100"
      }`}
    >
      <p className="text-gray-800 font-medium">{content}</p>
    </div>
  );
}

export default Task;