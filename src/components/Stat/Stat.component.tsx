import styles from "src/components/Stat/Stat.module.css";
import { StatType } from "src/contentful/parseStat";

interface StatProps {
  stat: StatType | null;
}

export const Stat = (props: StatProps) => {
  const { stat } = props;

  if (!stat) {
    return null;
  }

  return (
    <div className={styles.stat}>
      <h3>
        {stat.value}
        {stat.unit}{" "}
        {stat?.increaseDecrease ? (
          <span className={styles.increaseDecrease}>
            {stat.increaseDecrease === "Increase" ? "⬆️" : "⬇️"}
          </span>
        ) : null}
      </h3>
      <p>{stat.caption}</p>
    </div>
  );
};
