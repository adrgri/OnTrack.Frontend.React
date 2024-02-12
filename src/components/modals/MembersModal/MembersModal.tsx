import React, { useState } from "react";
import { Box, Typography, Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PopupLayout from "../../layout/PopupLayout";
import SmallButton from "../../../styledComponents/SmallButton";
import StyledSidebarModalInput from "../../../styledComponents/StyledSidebarModalInput";
import { User } from "../../../types";
import { theme } from "../../../themes/theme";

type MembersModalProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onMemberSelect: (member: User) => void;
};

const mockMembers = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "Alice@me.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "Bob@me.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
    email: "Charlie@me.com",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
];

const MembersModal: React.FC<MembersModalProps> = ({
  open,
  anchorEl,
  onClose,
  onMemberSelect,
}) => {
  const [searchMember, setSearchMember] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMember(event.target.value);
  };

  const filteredMembers = mockMembers.filter(
    (member) =>
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(searchMember.toLowerCase()) ||
      member.email.toLowerCase().includes(searchMember.toLowerCase())
  );

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
        value={searchMember}
        onChange={handleSearchChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />

      {searchMember &&
        filteredMembers.map((member) => (
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
              src={member.avatar}
              alt={`${member.firstName} ${member.lastName}`}
            />
            <Typography>
              {member.firstName} {member.lastName} - {member.email}
            </Typography>
          </Box>
        ))}

      <SmallButton variant="contained">Dodaj</SmallButton>
    </PopupLayout>
  );
};

export default MembersModal;
