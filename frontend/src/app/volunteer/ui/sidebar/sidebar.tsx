// import styles from "../sidebar/sidebar.module.css";
// import Link from "next/link";
// import { CgProfile } from "react-icons/cg";
// import { MdScreenSearchDesktop, MdTaskAlt } from "react-icons/md";
// import { IoMdSchool } from "react-icons/io";
// import { assests } from "../../assest/assest.js";
// import { IoIosLogOut } from "react-icons/io";
// import { FaIdCardClip } from "react-icons/fa6";
// import Image from "next/image";

// const menuItems = [
//   {
//     title: "Profile",
//     path: "/volunteer/dashboard/profile",
//     icon: <CgProfile />,
//   },
//   {
//     title: "Lecture",
//     path: "/volunteer/dashboard/lecture",
//     icon: <MdScreenSearchDesktop />,
//   },
//   {
//     title: "Course",
//     path: "/volunteer/dashboard/course",
//     icon: <IoMdSchool />,
//   },
//   {
//     title: "Task",
//     path: "/volunteer/dashboard/task",
//     icon: <MdTaskAlt />,
//   },
//   {
//     title: "Get Card",
//     path: "/volunteer/dashboard/getCard",
//     icon: <FaIdCardClip />,
//   },
//   {
//     title: "Logout",
//     path: "/",
//     icon: <IoIosLogOut />,
//   },
// ];

// const Sidebar = () => {
//   return (
//     <div className={styles.sidebar}>
//       <div>
//         <Image
//           src={assests.logo}
//           alt="Logo"
//           priority
//           width={200}
//           height={60}
//           className={styles.logo}
//         />
//       </div>
//       <ul className={styles.menu}>
//         {menuItems.map((item) => (
//           <li key={item.title} className={styles.menuItem}>
//             <Link href={item.path} className={styles.link}>
//               <span className={styles.icon}>{item.icon}</span>
//               <span className={styles.title}>{item.title}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
