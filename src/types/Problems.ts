export type ProblemsType = "branding" | "marketing" | "sales";

export interface ProblemType {
  id: ProblemsType;
  title: string;
  statement: string;
  solutionList: string[];
}
