import React from "react";
import TaskUpload  from "../../components/Tasks/TaskUpload";
import  TaskGrid  from "../../components/Tasks/TaskGrid";

const Index: React.FC = () => {
  return (
    <div>
      <TaskUpload />
      <TaskGrid />
    </div>
  );
};

export default Index;
