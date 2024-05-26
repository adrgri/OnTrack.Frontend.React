import React from "react";
import {
  Box,
  Typography,
  Avatar,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PopupLayout from "../../layout/PopupLayout";
import SmallButton from "../../../styledComponents/SmallButton";
import StyledSidebarModalInput from "../../../styledComponents/StyledSidebarModalInput";
import { Member, UsersList } from "../../../types";
import { theme } from "../../../themes/theme";
import { useMemberSearch } from "../../../hooks/useMemberSearch";

type MembersModalProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onMemberSelect: (member: Member) => void;
  selectedMembers: UsersList[];
};

const MembersModal: React.FC<MembersModalProps> = ({
  open,
  anchorEl,
  onClose,
  onMemberSelect,
  selectedMembers,
}) => {
  const { searchMemberRef, members, isLoadingMembers, handleSearchChange } =
    useMemberSearch(false, selectedMembers);
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
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
                onClick={() => onMemberSelect(member)}
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
        </>
      )}

      <SmallButton variant="contained">Dodaj</SmallButton>
    </PopupLayout>
  );
};

export default MembersModal;
