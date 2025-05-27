"use client";

import Image from "next/image";
import React from "react";
import styles from "./dashboard.module.css"; // You can use Tailwind or CSS modules
import { assests } from "../../assest/assest";

const IdCardFrontImg: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={assests.logo} alt="Logo" width={100} height={50} />
        </div>
        <h3>Combine Foundation</h3>
      </div>

      <div className={styles.photoWrapper}>
        <Image
          src={assests.profile_img}
          alt="M. Umar"
          width={100}
          height={100}
          className={styles.profilePhoto}
        />
      </div>

      <div className={styles.details}>
        <h2 className={styles.name}>M. Umar</h2>
        <p className={styles.position}>Co-ordinator and Innovation Lead</p>
        <p>
          <strong>ID:</strong> 37521
        </p>
        <p>
          <strong>Join Date:</strong> May 01, 2025
        </p>
        <p>
          <strong>Phone:</strong> +92 316 378243
        </p>
      </div>
    </div>
  );
};

export default IdCardFrontImg;
