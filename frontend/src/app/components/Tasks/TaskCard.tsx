import React from "react";

interface TaskCardProps {
  title: string;
  subtitle: string;
  description: string;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  subtitle,
  description,
  onDelete,
}) => {
  return (
    <article className="bg-white overflow-hidden rounded-[5px]">
      <header className="text-white text-xl font-bold leading-6 uppercase bg-[#FF5D15] h-[55px] px-8 flex items-center">
        {title}
      </header>
      <div className="p-8">
        <h2 className="text-[#1A1A1A] text-xl font-bold leading-6 capitalize mb-[18px]">
          {subtitle}
        </h2>
        <p className="text-black text-base font-normal leading-[19.2px] uppercase mb-5">
          {description}
        </p>
        <button
          onClick={onDelete}
          className="bg-[#FF5D15] text-white text-base font-bold leading-[19.2px] capitalize p-2.5 rounded-[5px] hover:bg-[#e54d0d] transition-colors"
        >
          DELETE TASK
        </button>
      </div>
    </article>
  );
};
