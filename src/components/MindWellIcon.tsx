const MindWellIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img
    src="/mindwell_app_icon.svg"
    alt="MindWell Icon"
    className={`${className} object-contain`}
  />
);

export default MindWellIcon;
