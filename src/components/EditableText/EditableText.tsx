import React, { useState, useRef } from "react";
import { Typography, Box } from "@mui/material";
import StyledUnderlinedInputBase from "../../styledComponents/StyledUnderlinedInputBase";

type EditableTextProps = {
  text: string;
  onTextChange: (text: string) => void;
  placeholder: string;
  sxInput?: object;
  sxTypography?: object;
  onBlur?: () => void; // Add onBlur prop
};

const EditableText: React.FC<EditableTextProps> = ({
  text,
  onTextChange,
  placeholder,
  sxInput,
  sxTypography,
  onBlur, // Accept onBlur prop
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (inputRef.current) {
      onTextChange(inputRef.current.value);
      if (onBlur) {
        onBlur(); // Call onBlur prop if it exists
      }
    }
  };

  return (
    <Box
      onClick={handleFocus}
      sx={{ cursor: "text", ...(isEditing ? {} : { display: "inline-block" }) }}
    >
      {isEditing ? (
        <StyledUnderlinedInputBase
          autoFocus
          fullWidth
          placeholder={placeholder}
          defaultValue={text}
          onBlur={handleBlur}
          inputRef={inputRef}
          sx={sxInput}
        />
      ) : (
        <Typography variant="body1" sx={{ marginY: "8px", ...sxTypography }}>
          {text || placeholder}
        </Typography>
      )}
    </Box>
  );
};

export default EditableText;
