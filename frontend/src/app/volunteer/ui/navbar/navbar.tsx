// import React from "react";
// import Link from "next/link";
// import styles from "../navbar/navbar.module.css";
// import { CgProfile } from "react-icons/cg";
// import { MdNotificationsActive } from "react-icons/md";

// const Navbar = () => {
//   const menuItems = [
//     {
//       title: "Notification",
//       path: "/volunteer/dashboard/notification",
//       icon: <MdNotificationsActive />,
//     },
//     {
//       title: "Profile",
//       path: "/volunteer/dashboard/profile",
//       icon: <CgProfile />,
//     },
//   ];

//   return (
//     <>
//       <nav className={styles.navbar}>
//         <h1 className={styles.mainheading}>Combine Foundation</h1>
//         <ul className={styles.navlinks}>
//           {menuItems.map((item) => (
//             <li key={item.title} className={styles.menuItem}>
//               <Link href={item.path} className={styles.link}>
//                 <span className={styles.icon}>{item.icon}</span>
//                 <span className={styles.title}>{item.title}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
