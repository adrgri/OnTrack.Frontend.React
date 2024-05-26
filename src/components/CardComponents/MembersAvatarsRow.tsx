import React from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import { Member } from "../../types";

interface MembersAvatarsRowProps {
  members: Member[];
  width?: number | string;
  height?: number | string;
}

const MembersAvatarsRow: React.FC<MembersAvatarsRowProps> = ({
  members,
  width,
  height,
}) => {
  return (
    <AvatarGroup max={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
      {members.map((member, index) => (
        <Avatar
          key={member.id ?? index}
          // src={member?.avatar}
          alt={`${member.firstName} ${member.lastName}`}
          sx={{ width: width, height: height }}
        />
      ))}
    </AvatarGroup>
  );
};

export default MembersAvatarsRow;
