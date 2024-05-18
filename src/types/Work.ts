import { ProblemsType } from "src/types/Problems";

export interface WorkType {
  id:
    | "blue-ridge-pickling"
    | "sticky-bean"
    | "route-7"
    | "frontier-kitchen"
    | "family-of-nuts"
    | "new-ag-school";
  title?: string;
  description?: string;
  mediaUrl: string;
  tags?: ProblemsType[];
  type: "image" | "video";
}
