import React, { useState, useRef } from "react";
import { Typography, Box } from "@mui/material";
import StyledUnderlinedInputBase from "../../styledComponents/StyledUnderlinedInputBase";

type EditableTextProps = {
  text: string;
  onTextChange: (text: string) => void;
  placeholder: string;
};

const EditableText: React.FC<EditableTextProps> = ({
  text,
  onTextChange,
  placeholder,
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
        />
      ) : (
        <Typography
          variant="body1"
          //   fontSize={"32px"}
          sx={{ marginY: "8px", paddingLeft: "5px" }}
        >
          {text || placeholder}
        </Typography>
      )}
    </Box>
  );
};

export default EditableText;
