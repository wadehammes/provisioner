import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getClientSnapshot = () => true;

const getServerSnapshot = () => false;

export const useIsBrowser = () =>
  useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
