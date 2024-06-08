import React from "react";
import {
  Box,
  Typography,
  Avatar,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PopupLayout from "../../layout/PopupLayout";
import StyledSidebarModalInput from "../../../styledComponents/StyledSidebarModalInput";
import { Member } from "../../../types";
import { theme } from "../../../themes/theme";
import { useMemberSearch } from "../../../hooks/useMemberSearch";

type MembersModalProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onMemberSelect: (member: Member) => void;
  selectedMembers: Member[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  projectId?: string;
};

const MembersModal: React.FC<MembersModalProps> = ({
  open,
  anchorEl,
  onClose,
  onMemberSelect,
  selectedMembers,
  setSelectedMembers,
  projectId,
}) => {
  const {
    searchMemberRef,
    members,
    isLoadingMembers,
    handleSearchChange,
    clearSearchInput,
  } = useMemberSearch(false, selectedMembers, true, projectId);

  const handleMemberClick = (member: Member) => {
    onMemberSelect(member);
    clearSearchInput();
  };

  const onMemberRemove = (memberId: string) => {
    const updatedMembers = selectedMembers.filter((m) => m.id !== memberId);
    setSelectedMembers(updatedMembers);
  };

  return (
    <PopupLayout
      title="Członkowie"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <StyledSidebarModalInput
        fullWidth
        variant="filled"
        placeholder="Wyszukaj członków"
        inputRef={searchMemberRef}
        onChange={handleSearchChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />

      {searchMemberRef.current?.value && isLoadingMembers && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {searchMemberRef.current?.value &&
        members.length === 0 &&
        !isLoadingMembers && (
          <Typography color="textSecondary" variant="body2">
            Brak wyników
          </Typography>
        )}

      {!isLoadingMembers && (
        <>
          {searchMemberRef.current?.value &&
            members.map((member) => (
              <Box
                key={member.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 2,
                  borderRadius: "5px",
                  transition: "background-color 0.4s ease-in-out",
                  ":hover": {
                    cursor: "pointer",
                    backgroundColor: theme.palette.background.default,
                  },
                }}
                onClick={() => handleMemberClick(member)}
              >
                <Avatar
                  // src={member.avatar}
                  alt={`${member.firstName} ${member.lastName}`}
                />
                <Typography>
                  {member.firstName} {member.lastName}
                </Typography>
              </Box>
            ))}

          <Box
            mt={4}
            sx={{
              maxHeight: selectedMembers.length > 2 ? "100px" : "auto",
              overflowY: selectedMembers.length > 2 ? "scroll" : "visible",
            }}
          >
            {selectedMembers.map((member) => (
              <Box
                key={member.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Avatar alt={`${member.firstName} ${member.lastName}`} />
                <Typography>
                  {member.firstName} {member.lastName}
                </Typography>
                <IconButton onClick={() => onMemberRemove(member.id ?? "")}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </>
      )}
    </PopupLayout>
  );
};

export default MembersModal;
