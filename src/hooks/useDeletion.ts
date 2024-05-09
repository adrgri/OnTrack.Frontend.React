import { useState } from "react";

interface DeletableItem {
  id: string;
  type: string; // "task" or "project"
}

interface DeletionState {
  isConfirmOpen: boolean;
  closeModal: () => void;
  requestDelete: (
    item: DeletableItem,
    deleteFunction: (id: string) => Promise<void>
  ) => void;
  confirmDelete: () => void;
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

  const confirmDelete = () => {
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
    closeModal: () => setIsConfirmOpen(false),
    requestDelete,
    confirmDelete,
  };
};

export default useDeletion;
