import React, { useState } from "react";
import { Popover, Box, Typography, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import SmallButton from "../../../styledComponents/SmallButton";

interface CalendarModalProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs | null) => void;
  title: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  open,
  anchorEl,
  onClose,
  value,
  onChange,
  title,
}) => {
  const [selectedDate, setSelectedDate] = useState(value || dayjs());

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate || dayjs());
    onChange(newDate);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box
        sx={{
          width: 350,
          // height: 194,
          bgcolor: "background.paper",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 1,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#5e5b5b",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            textAlign: "center",
            width: "100%",
          }}
        >
          {title}
        </Typography>

        <IconButton
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ p: 0 }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#5e5b5b",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textAlign: "center",
              width: "100%",
              mt: 2,
            }}
          >
            Termin
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              paddingInline: 3,
              mt: 2,
            }}
          >
            <DateField
              label="Data"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                flex: 1,
                "& .MuiFormControl-root": { width: "100%" },
              }}
            />
            <TimePicker
              label="Godzina"
              value={selectedDate}
              onChange={(newTime) => setSelectedDate(newTime || dayjs())}
              sx={{
                flex: 1,
                "& .MuiFormControl-root": { width: "100%" },
              }}
            />
          </Box>
        </LocalizationProvider>
        <SmallButton variant="contained">Zapisz</SmallButton>
      </Box>
    </Popover>
  );
};

export default CalendarModal;
