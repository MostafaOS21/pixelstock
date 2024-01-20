import { Dispatch, SetStateAction } from "react";

export default interface IMediaProps {
  query: string;
  orientation: string | null;
  size: string | null;
  color: string | null;
  page?: number;
  setPage: Dispatch<SetStateAction<number>>;
}
