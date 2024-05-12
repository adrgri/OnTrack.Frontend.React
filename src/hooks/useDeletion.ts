import { useState } from "react";

interface DeletableItem {
  id: string;
  type: "task" | "project";
}

interface DeletionState {
  isConfirmOpen: boolean;
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
  requestDelete: (
    item: DeletableItem,
    deleteFunction: (id: string) => Promise<void>
  ) => void;
  confirmDelete: (event: React.MouseEvent<HTMLElement>) => void;
}

const useDeletion = (): DeletionState => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<DeletableItem | null>(null);
  const [deleteAction, setDeleteAction] =
    useState<(id: string) => Promise<void>>();

  const requestDelete = (
    item: DeletableItem,
    action: (id: string) => Promise<void>
  ) => {
    setCurrentItem(item);
    setDeleteAction(() => action);
    setIsConfirmOpen(true);
  };

  const confirmDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (currentItem && deleteAction) {
      deleteAction(currentItem.id)
        .then(() => console.log(`${currentItem.type} deleted successfully`))
        .catch((error) =>
          console.error(`Failed to delete ${currentItem.type}:`, error)
        );
      setIsConfirmOpen(false);
    }
  };

  return {
    isConfirmOpen,
    closeModal: (event) => {
      event.stopPropagation();
      setIsConfirmOpen(false);
    },
    requestDelete,
    confirmDelete,
  };
};

export default useDeletion;
