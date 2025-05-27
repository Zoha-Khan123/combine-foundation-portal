import Image from "next/image";
import React from "react";

interface LectureCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onDelete: () => void;
}

export const LectureCard: React.FC<LectureCardProps> = ({
  imageUrl,
  title,
  description,
  onDelete,
}) => {
  return (
    <article className="bg-white overflow-hidden rounded-[5px]">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-[224px] object-cover"
        width={224}
        height={224}
      />
      <div className="p-8">
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-[15px]">
          {title}
        </h3>
        <p className="text-base text-black uppercase mb-5">{description}</p>
        <button
          onClick={onDelete}
          className="bg-[#f16d00] text-white text-base font-bold leading-[19.2px] capitalize p-2.5 rounded-[5px] hover:bg-[#000000] transition-colors"
        >
          DELETE LECTURE
        </button>
      </div>
    </article>
  );
};
