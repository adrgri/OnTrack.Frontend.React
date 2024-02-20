import { Card, CardContent } from "@mui/material";

interface GenericCardProps {
  onClick?: () => void;
  children: React.ReactNode;
  sx?: object;
}

const GenericCard = ({ onClick, children, sx }: GenericCardProps) => {
  return (
    <Card
      sx={{
        my: 2,
        boxShadow: 3,
        transition: "border-color 0.4s ease-in-out",
        border: 2,
        borderRadius: "5px",
        borderColor: "transparent",
        "&:hover": {
          borderColor: "primary.main",
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default GenericCard;
