import classNames from "classnames";
import { InView } from "react-intersection-observer";
import styles from "src/components/Stat/Stat.module.css";
import { StatType } from "src/contentful/parseStat";
import ArrowUpRightIcon from "src/icons/ArrowUpRight.icon.svg";
interface StatProps {
  stat: StatType | null;
}

export const Stat = (props: StatProps) => {
  const { stat } = props;

  if (!stat) {
    return null;
  }

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <div
          ref={ref}
          className={classNames(styles.stat, { [styles.inView]: inView })}
        >
          <h3>
            {stat.value}
            {stat.unit}{" "}
            {stat?.increaseDecrease ? (
              <span className={styles.increaseDecrease}>
                {stat.increaseDecrease === "Increase" ? (
                  <ArrowUpRightIcon />
                ) : (
                  <ArrowUpRightIcon className={styles.decrease} />
                )}
              </span>
            ) : null}
          </h3>
          <p>{stat.caption}</p>
        </div>
      )}
    </InView>
  );
};
