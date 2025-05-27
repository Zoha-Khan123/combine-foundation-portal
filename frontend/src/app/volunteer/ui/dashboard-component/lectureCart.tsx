"use client";

import React, { useState } from "react";
import styles from "./dashboard.module.css";

interface LectureCartProps {
  title: string;
  description: string;
  videoSrc: string;
}

const LectureCart: React.FC<LectureCartProps> = ({
  title,
  description,
  videoSrc,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => setIsOpen(true);
  const closeVideo = () => setIsOpen(false);

  return (
    <>
      <div className={styles.cart}>
        <div className={styles.videoWrapper} onClick={openVideo}>
          <video width="100%" height="180" muted>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h3 className={styles.secheading}>{title}</h3>
        <p className={styles.text}>{description}</p>
      </div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeVideo}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <video controls autoPlay className={styles.fullVideo}>
              <source src={videoSrc} type="video/mp4" />
            </video>
            <button className={styles.closeButton} onClick={closeVideo}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LectureCart;
