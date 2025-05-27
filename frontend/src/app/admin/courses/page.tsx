"use client";

import React from "react";
import { CourseUpload } from "../../components/Courses/CourseUpload";
import CourseGrid  from "../../components/Courses/CourseGrid";

const Index: React.FC = () => {
  return (
    <div>
      <CourseUpload />
      <CourseGrid />
    </div>
  );
};

export default Index;