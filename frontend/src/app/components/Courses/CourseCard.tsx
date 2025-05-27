import * as React from "react";

interface CourseCardProps {
  title: string;
  heading: string;
  description: string;
  onDelete: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  heading,
  description,
  onDelete,
}) => {
  return (
    <article className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <header className="bg-[#FF5D15] px-6 py-5">
        <h1 className="text-white text-xl font-bold uppercase">{title}</h1>
      </header>
      <div className="px-6 py-5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">{heading}</h2>
        <p className="text-sm text-gray-700 uppercase">{description}</p>
        <div>
          <button
            onClick={onDelete}
            className="bg-[#FF5D15] hover:bg-[#e54d0d] text-white text-sm font-semibold uppercase py-2 px-4 rounded-md transition"
            aria-label={`Delete ${title}`}
          >
            Delete Course
          </button>
        </div>
      </div>
    </article>
  );
};
