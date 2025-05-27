import * as React from "react";
import { CourseCard } from "./CourseCard";

interface Course {
  id: string;
  title: string;
  heading: string;
  description: string;
}

export const CourseList: React.FC = () => {
  const [courses, setCourses] = React.useState<Course[]>([
    {
      id: "1",
      title: "FIRST COURSE",
      heading: "Lorem",
      description:
        "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY.",
    },
    {
      id: "2",
      title: "SECOND COURSE",
      heading: "Lorem",
      description:
        "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY.",
    },
  ]);

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  };

  const [sortOrder, setSortOrder] = React.useState<"Newest" | "Oldest">("Newest");

  const toggleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "Newest" ? "Oldest" : "Newest"));
  };

  const sortedCourses = React.useMemo(() => {
    return [...courses].sort((a, b) => {
      return sortOrder === "Newest"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  }, [courses, sortOrder]);

  return (
    <section className="w-full px-6 py-8">
      {/* Header row */}
      <div className="flex flex-wrap justify-between items-center w-full mb-6">
        <h2 className="text-2xl font-bold text-black">Recent Courses</h2>
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-black">Sort By:</span>
          <button
            onClick={toggleSort}
            className="text-base font-semibold text-black hover:underline cursor-pointer"
          >
            {sortOrder.toUpperCase()} ↓
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {sortedCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            heading={course.heading}
            description={course.description}
            onDelete={() => handleDeleteCourse(course.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
