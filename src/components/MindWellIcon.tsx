import Icon from "../../public/mindwell_app_icon.png";


const MindWellIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img
    src={Icon}
    alt="MindWell Icon"
    className={`${className} object-contain`}
  />
);

export default MindWellIcon;