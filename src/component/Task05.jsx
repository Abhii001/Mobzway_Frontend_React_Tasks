import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";

const initialTasks = Array.from({ length: 10 }, (_, i) => ({
  id: `task-${i + 1}`,
  content: `Task ${i + 1}`,
}));

const initialColumns = {
  unplanned: initialTasks,
  today: [],
  tomorrow: [],
  thisWeek: [],
  nextWeek: [],
};

export default function Task05() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumnId = Object.keys(columns).find((key) =>
      columns[key].some((task) => task.id === active.id)
    );
    const targetColumnId = over.id;

    if (!sourceColumnId || !targetColumnId || sourceColumnId === targetColumnId) return;

    setColumns((prev) => {
      const sourceTasks = [...prev[sourceColumnId]];
      const targetTasks = [...prev[targetColumnId]];
      const movedTask = sourceTasks.find((task) => task.id === active.id);

      return {
        ...prev,
        [sourceColumnId]: sourceTasks.filter((task) => task.id !== active.id),
        [targetColumnId]: [...targetTasks, movedTask],
      };
    });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-4 p-4">
        {Object.entries(columns).map(([id, tasks]) => (
          <TaskColumn key={id} id={id} tasks={tasks} />
        ))}
      </div>
    </DndContext>
  );
}
