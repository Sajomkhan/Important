import { AboutIcon, EducationIcon, ExperienceIcon, IntroductionIcon, ProjectIcon, TechIcon } from "../icons/icons";
import { Link } from 'react-router-dom';


const menuItems = [
  {
    icon: <IntroductionIcon />,
    title: "Introduction",
    linkItem: "/introduction"
  },
  {
    icon: <AboutIcon />,
    title: "About",
    linkItem: "/about"
  },
  {
    icon: <TechIcon />,
    title: "Tech-Stack",
    linkItem: "/tech"
  },
  {
    icon: <ProjectIcon />,
    title: "Project",
    linkItem: "/project"
  },
  {
    icon: <EducationIcon />,
    title: "Education",
    linkItem: "/education"
  },
  {
    icon: <ExperienceIcon />,
    title: "Experience",
    linkItem: "/experience"
  },
];

const Menubar = () => {
  return (
    <div className="fixed z-30 min-h-[calc(100vh-56px)] lg:w-[300px] shadow-lg py-10 px-4 lg:px-12 bg-gray-900">
      {menuItems.map((menuItem, index) => (
        <Link to={menuItem.linkItem} key={index} className="flex items-center gap-5 mb-4">
          <span className="text-lg">{menuItem.icon}</span>
          <span>{menuItem.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Menubar;