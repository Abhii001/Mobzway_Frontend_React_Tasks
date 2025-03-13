import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

function TaskColumn({ id, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="task-column bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-center text-gray-800">{id}</h3>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} content={task.content} />
        ))}
      </SortableContext>
    </div>
  );
}

export default TaskColumn;
