import { Icon } from "../../types";

type EntityIconProps = {
  icon: Icon | null | undefined;
  style?: React.CSSProperties;
};

const EntityIcon: React.FC<EntityIconProps> = ({ icon, style }) => {
  if (!icon) return null;

  const defaultStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
    ...style,
  };

  return <img src={icon.imageUrl} alt={icon.iconName} style={defaultStyle} />;
};

export default EntityIcon;
