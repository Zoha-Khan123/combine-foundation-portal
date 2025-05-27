"use client";

import React from "react";
import Image from "next/image";
import styles from "./dashboard.module.css"; // You can also use Tailwind if preferred
import { assests } from "../../assest/assest";

const IdCardBackImg: React.FC = () => {
  return (
    <div className={styles.card}>
      {/* Top orange curve */}
      <div className={styles.curveTop} />

      {/* QR Code */}
      <div className={styles.qrWrapper}>
        <Image
          src={assests.barcode} // Save the QR card image in public/ folder
          alt="QR Code"
          width={180}
          height={180}
        />
      </div>

      {/* Combine Foundation text */}
      <div className={styles.text}>
        <h1>COMBINE</h1>
        <h2>FOUNDATION</h2>
      </div>

      {/* Bottom orange curve */}
      <div className={styles.curveBottom} />
    </div>
  );
};

export default IdCardBackImg;
