import classNames from "classnames";
import styles from "src/components/ProblemCard/ProblemCard.module.css";
import { ProblemType } from "src/types/Problems";

interface ProblemCardProps {
  problem: ProblemType;
}

export const ProblemCard = (props: ProblemCardProps) => {
  const { problem } = props;

  return (
    <div>
      <div className={classNames(styles.problemCard, styles[`${problem.id}`])}>
        <h3>{problem.title}</h3>
        <p>{problem.statement}</p>
      </div>
      <div className={styles.solutionList}>
        <p>How we can help</p>
        <ul>
          {problem.solutionList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
