import React from "react";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
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
        <Tooltip
          key={member.id ?? index}
          title={`${member.firstName} ${member.lastName}`}
          arrow
        >
          <Avatar
            // src={member?.avatar}
            alt={`${member.firstName} ${member.lastName}`}
            sx={{ width: width, height: height }}
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};

export default MembersAvatarsRow;
