import React, { useRef, useState } from "react";
import PopupLayout from "../../layout/PopupLayout";
import SmallButton from "../../../styledComponents/SmallButton";
import FolderIcon from "../../../assets/icons/FolderIcon.svg";
import StyledSidedbarModalBox from "../../../styledComponents/StyledSidebarModalBox";
import { Attachment } from "../../../types";

interface AttachmentModalProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onAttachmentSelect: (attachments: Attachment[]) => void;
}

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  open,
  anchorEl,
  onClose,
  onAttachmentSelect,
}) => {
  const [files, setFiles] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles: Attachment[] = Array.from(selectedFiles).map((file) => ({
        ...file,
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddClick = () => {
    if (files.length > 0) {
      onAttachmentSelect(files);
      onClose();
      console.log("Selected files:", files);
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
        {files.length > 0
          ? files.map((file) => <div key={file.url}>{file.name}</div>)
          : "Wybierz dokumenty lub zdjęcia"}
      </StyledSidedbarModalBox>

      <input
        ref={fileInputRef}
        type="file"
        multiple
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
