"use client";

import React, { useState } from "react";
import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export const TaskList: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "FIRST TASK",
      subtitle: "lorem",
      description:
        "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY.",
    },
    {
      id: "2",
      title: "SECOND TASK",
      subtitle: "lorem",
      description:
        "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY.",
    },
  ]);

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const sortedTasks = [...tasks].sort((a, b) =>
    sortOrder === "newest"
      ? parseInt(b.id) - parseInt(a.id) 
      : parseInt(a.id) - parseInt(b.id)
  );

  return (
    <main className="flex flex-col w-full p-5">
      {/* Heading + Sort */}
      <div className="flex justify-between items-center mt-10 mb-5">
        <h2 className="text-xl font-semibold text-black">RECENT TASK&apos;S</h2>
        <div className="flex items-center gap-6">
          <span className="text-xl font-semibold text-black">Sort By:</span>
          <button
            onClick={toggleSort}
            className="text-xl font-semibold text-black cursor-pointer"
          >
            {sortOrder.toUpperCase()} ↓
          </button>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-2 gap-[37px] max-md:grid-cols-1">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            subtitle={task.subtitle}
            description={task.description}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </div>
    </main>
  );
};

export default TaskList;
