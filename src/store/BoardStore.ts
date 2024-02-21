import { create } from "zustand";

// interface BoardStore {
//   board: Board;
//   getBoard: () => void;
// }

const useBoardStore = create(() => ({
  board: 0,
}));

export default useBoardStore;
