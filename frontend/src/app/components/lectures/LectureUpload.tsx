"use client";

import React, { useCallback, useState, useRef } from "react";
import { toast } from "../../components/ui/use-toast";
import Image from "next/image";

export const LectureUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    if (files.length === 0) return;

    console.log("Files selected:", files);

    toast({
      title: "Files received",
      description: `${files.length} file(s) have been selected.`,
    });

    // Add actual upload logic here
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      handleFiles(files);
    },
    []
  );

  const handleChooseFilesClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      className={`border flex flex-col items-center justify-center min-h-[312px] bg-white mt-[67px] p-10 rounded-[5px] ${
        isDragging ? "border-[#5C049F] border-2" : "border-[#E6E6E6]"
      } transition-all duration-200`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Image
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff74cc58e7224af3a17d4d23bee40a555b71ebe6"
        alt="Upload lectures"
        className="w-[610px] max-w-full mb-[20px]"
        width={610}
        height={200}
      />
      <h2 className="text-[25px] font-semibold text-center text-black">
        DRAG LECTURES HERE TO ADD THEM OR
      </h2>
      <button
        onClick={handleChooseFilesClick}
        className="text-2xl font-semibold text-[#5C049F] text-center hover:underline cursor-pointer"
      >
        CHOOSE YOUR FILES
      </button>
      <input
        title="Choose Files"
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileInputChange}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.mov"
      />
    </section>
  );
};
