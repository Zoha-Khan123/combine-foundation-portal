"use client";

import React, { useState } from "react";
import { LectureCard } from "./LectureCard";

export const LectureGrid: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Sample lecture data
  const [lectures, setLectures] = useState([
    {
      id: 1,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bdcf1b0578b5ef813b85d4746194fd65998d12c4",
      title: "Lorem",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      width: 610,
      height: 200,
    },
    {
      id: 2,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/149674a107a966a118f53277be5f0bc9520e9f4c",
      title: "Lorem",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      width: 610,
      height: 200,
    },
    {
      id: 3,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5c7ca30762de45f3ab5f43c966562565ebd08d15",
      title: "Lorem",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      width: 610,
      height: 200,
    },
  ]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const sortedLectures = [...lectures].sort((a, b) => {
    return sortOrder === "newest" ? b.id - a.id : a.id - b.id;
  });

  // Delete function
  const handleDelete = (id: number) => {
    setLectures((prevLectures) =>
      prevLectures.filter((lecture) => lecture.id !== id)
    );
  };

  return (
    <section>
      <div className="flex justify-between items-center mt-10">
        <h2 className="text-xl font-semibold text-black">
          RECENT LECTURE&apos;S
        </h2>
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
      <div className="grid grid-cols-3 gap-4 mt-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {sortedLectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            imageUrl={lecture.imageUrl}
            title={lecture.title}
            description={lecture.description}
            onDelete={() => handleDelete(lecture.id)} // Deleting the lecture on click
          />
        ))}
      </div>
    </section>
  );
};
