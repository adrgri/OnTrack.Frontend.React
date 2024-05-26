// useMemberSearch.ts

import { useState, useRef } from "react";
import axios from "axios";
import { Member } from "../types";
import { useAuth } from "../contexts/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

export const useMemberSearch = (
  filterCurrentUser: boolean,
  selectedMembers: Member[] = []
) => {
  const { token, user } = useAuth();
  const searchMemberRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  const handleSearchChange = async () => {
    const query = searchMemberRef.current?.value || "";
    if (query) {
      try {
        setIsLoadingMembers(true);
        const response = await axios.get(`${apiUrl}/user/search/${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredMembers = response.data.filter((member: Member) => {
          const isCurrentUser = filterCurrentUser && member.id === user?.id;
          const isAlreadySelected = selectedMembers.some(
            (selected) => selected.id === member.id
          );
          return !isCurrentUser && !isAlreadySelected;
        });

        setMembers(filteredMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoadingMembers(false);
      }
    } else {
      setMembers([]);
    }
  };

  return { searchMemberRef, members, isLoadingMembers, handleSearchChange };
};
