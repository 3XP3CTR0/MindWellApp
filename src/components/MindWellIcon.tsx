import Icon from "../../public/mindwell_app_icon.svg";


const MindWellIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img
    src={Icon as unknown as string}
    alt="MindWell Icon"
    className={`${className} object-contain`}
  />
);

export default MindWellIcon;