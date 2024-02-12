import React, { useRef, useState } from "react";
import PopupLayout from "../../layout/PopupLayout";
import SmallButton from "../../../styledComponents/SmallButton";
import FolderIcon from "../../../assets/icons/FolderIcon.svg";
import StyledSidedbarModalBox from "../../../styledComponents/StyledSidebarModalBox";

interface AttachmentModalProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onAttachmentSelect: (attachment: File) => void;
}

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  open,
  anchorEl,
  onClose,
  onAttachmentSelect,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file); // Set the selected file in the state
      onAttachmentSelect(file); // Pass the File object to the parent's handler
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddClick = () => {
    if (file) {
      onAttachmentSelect(file); // Assuming you want to pass the file name
      onClose();
    }
  };

  return (
    <PopupLayout
      title="Załącznik"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <StyledSidedbarModalBox
        onClick={triggerFileInput}
        icon={<img src={FolderIcon} alt="folder" />}
        showIcon={true}
      >
        {file ? file.name : "Wybierz dokument lub zdjęcie"}
      </StyledSidedbarModalBox>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <SmallButton variant="contained" onClick={handleAddClick}>
        Dodaj
      </SmallButton>
    </PopupLayout>
  );
};

export default AttachmentModal;
