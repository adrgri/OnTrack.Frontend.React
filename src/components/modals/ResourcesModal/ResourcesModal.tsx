import { useFormik } from "formik";
import React from "react";
import { Box, Typography } from "@mui/material";
import PopupLayout from "../../layout/PopupLayout";
import SmallButton from "../../../styledComponents/SmallButton";
import StyledSmallTextField from "../../../styledComponents/StyledSmallTextField";
import StyledSidebarModalInput from "../../../styledComponents/StyledSidebarModalInput";
import { Resource } from "../../../types";

interface ResourcesModalProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  handleAddResource: (resource: Resource) => void;
}

const ResourcesModal: React.FC<ResourcesModalProps> = ({
  open,
  anchorEl,
  onClose,
  handleAddResource,
}) => {
  const formik = useFormik({
    initialValues: {
      id: Date.now(),
      resourceName: "",
      quantity: "",
      unit: "",
    },
    onSubmit: (values) => {
      handleAddResource({ ...values, id: Date.now() });

      onClose();
    },
  });

  return (
    <PopupLayout
      title="Dodaj zasoby"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <StyledSidebarModalInput
          fullWidth
          margin="normal"
          variant="filled"
          label=""
          id="resourceName"
          name="resourceName"
          placeholder="Wpisz nazwe zasobu"
          value={formik.values.resourceName}
          onChange={formik.handleChange}
          autoComplete="off"
        />

        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "14px", minWidth: "90px", color: "#5F5B5B" }}
          >
            Ilość
          </Typography>
          <StyledSmallTextField
            fullWidth
            type="number"
            margin="normal"
            variant="filled"
            label=""
            id="quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            autoComplete="off"
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "14px", minWidth: "90px", color: "#5F5B5B" }}
          >
            Jednostka
          </Typography>
          <StyledSmallTextField
            fullWidth
            margin="normal"
            variant="filled"
            label=""
            id="unit"
            name="unit"
            value={formik.values.unit}
            onChange={formik.handleChange}
            autoComplete="off"
          />
        </Box>

        <SmallButton type="submit" variant="contained">
          Dodaj
        </SmallButton>
      </form>
    </PopupLayout>
  );
};

export default ResourcesModal;
