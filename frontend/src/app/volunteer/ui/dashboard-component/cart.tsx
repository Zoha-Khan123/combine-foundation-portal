"use client";

import React from "react";
import styles from "./dashboard.module.css";

interface CartProps {
  title: string;
  name: string;
  description: string;
  buttonLabel: string;
  onButtonClick: (
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  isFileUpload: boolean;
}

const Cart: React.FC<CartProps> = ({
  title,
  name,
  description,
  buttonLabel,
  onButtonClick,
  isFileUpload,
}) => {
  return (
    <div className={styles.cart}>
      <div className={styles.mainheading}>
        {/* <span className={styles.iconWrapper}>
          <img src={icon.src} className={styles.iconWhite} alt={title} width="40" height="40" />
        </span> */}
        <span className={styles.title}>{title}</span>
      </div>

      <h3 className={styles.secheading}>{name}</h3>
      <p className={styles.text}>{description}</p>

      {isFileUpload ? (
        <label className={styles.uploadButton}>
          Upload File
          <input
            type="file"
            onChange={onButtonClick}
            className={styles.hiddenInput}
          />
        </label>
      ) : (
        <button className={styles.addButton} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default Cart;
