import React from "react";
import { Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";

interface DateChipProps {
  date: string | dayjs.Dayjs | null;
}

const DateChip: React.FC<DateChipProps> = ({ date }) => {
  if (!date) return null;

  const formattedDate = dayjs(date).format("DD MMM");

  return (
    <Chip
      icon={<AccessTimeIcon />}
      color="primary"
      label={formattedDate}
      size="small"
      sx={{ borderRadius: 0, fontSize: "13px" }}
    />
  );
};

export default DateChip;
