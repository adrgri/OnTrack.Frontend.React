import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Member, Project } from "../types";
import { useAuth } from "../contexts/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

export const useMemberSearch = (
  filterCurrentUser: boolean,
  selectedMembers: Member[] = [],
  limitToProjectMembers: boolean = false,
  projectId?: string
) => {
  const { token, user } = useAuth();
  const searchMemberRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  useEffect(() => {
    const fetchProjectMembers = async () => {
      if (projectId) {
        try {
          const projectResponse = await axios.get(
            `${apiUrl}/project/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Assuming projectResponse.data is an array of project objects
          const memberIds = projectResponse.data.flatMap(
            (project: Project) => project.memberIds
          );
          if (memberIds.length > 0) {
            const membersResponse = await axios.get(
              `${apiUrl}/user/by/ids/${memberIds.join(",")}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const uniqueMembersMap = new Map();
            membersResponse.data.forEach((member: Member) => {
              if (!uniqueMembersMap.has(member.id)) {
                uniqueMembersMap.set(member.id, member);
              }
            });

            setProjectMembers(Array.from(uniqueMembersMap.values()));
          } else {
            setProjectMembers([]);
          }
        } catch (error) {
          console.error("Error fetching project members:", error);
        }
      }
    };

    fetchProjectMembers();
  }, [projectId, token]);

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

        let filteredMembers = response.data.filter((member: Member) => {
          const isCurrentUser = filterCurrentUser && member.id === user?.id;
          const isAlreadySelected = selectedMembers.some(
            (selected) => selected.id === member.id
          );
          return !isCurrentUser && !isAlreadySelected;
        });

        if (limitToProjectMembers && projectId) {
          filteredMembers = filteredMembers.filter((member: Member) =>
            projectMembers.some(
              (projectMember) => projectMember.id === member.id
            )
          );
        }

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

  const clearSearchInput = () => {
    if (searchMemberRef.current) {
      searchMemberRef.current.value = "";
      setMembers([]);
    }
  };

  return {
    searchMemberRef,
    members,
    isLoadingMembers,
    handleSearchChange,
    clearSearchInput,
  };
};
