import { useSelector } from "react-redux";
import { RootState } from "./store";

export const useBooks = () => {
    return useSelector((state: RootState) => state.libraryDetails.books);
  };

