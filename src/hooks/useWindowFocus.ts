import { useSyncExternalStore } from "react";

const focusSubscribe = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onFocus = () => onStoreChange();
  const onBlur = () => onStoreChange();

  window.addEventListener("focus", onFocus);
  window.addEventListener("blur", onBlur);

  return () => {
    window.removeEventListener("focus", onFocus);
    window.removeEventListener("blur", onBlur);
  };
};

const getFocusSnapshot = () =>
  typeof document !== "undefined" && document.hasFocus();

const getFocusServerSnapshot = () => false;

const useWindowFocus = () =>
  useSyncExternalStore(
    focusSubscribe,
    getFocusSnapshot,
    getFocusServerSnapshot,
  );

export default useWindowFocus;
