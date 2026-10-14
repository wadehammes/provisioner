import { useEffect, useEffectEvent, useState } from "react";
import { useIsBrowser } from "src/hooks/useIsBrowser";

export const useHash = () => {
  const isBrowser = useIsBrowser();
  const [hash, setHash] = useState("");

  const onHashChange = useEffectEvent(() => {
    setHash(window.location.hash);
  });

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    onHashChange();

    window.addEventListener("hashchange", onHashChange, true);

    return () => window.removeEventListener("hashchange", onHashChange, true);
  }, [isBrowser]);

  return hash;
};
