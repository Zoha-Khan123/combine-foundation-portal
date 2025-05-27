import React from "react";
import { LectureUpload } from "../../components/lectures/LectureUpload";
import { LectureGrid } from "../../components/lectures/LectureGrid";

const Index: React.FC = () => {
  return (
    <div>
      <LectureUpload />
      <LectureGrid />
    </div>
  );
};

export default Index;
