import classNames from "classnames";
import { HTMLAttributes } from "react";

export const Provisioner = ({
  className,
}: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg
    id="provisioner-white-mark"
    data-name="Provisioner White Mark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 198.67 228.06"
    className={classNames("logo-icon", className)}
  >
    <path
      fill="var(--colors-white)"
      strokeWidth="0px"
      d="m190.07,80.87c-.68-38.19-31.95-69.04-70.29-69.04H8.58v17.59c0,25.98,14.17,48.71,35.18,60.88-21.01,12.17-35.18,34.9-35.18,60.88v65.05h87.84v-47.47h23.37c38.34,0,69.61-30.86,70.29-69.04h.02v-18.85h-.02ZM119.79,30.68c27.95,0,50.76,22.4,51.44,50.19h-23.34c-27.95,0-50.77-22.4-51.45-50.19h23.35Zm-92.34,0h50.14c.35,19.79,8.92,37.62,22.44,50.19h-21.14c-27.95,0-50.77-22.4-51.45-50.19Zm50.13,166.71H27.43v-46.21c0-28.38,23.09-51.46,51.46-51.46h21.14c-13.81,12.85-22.46,31.16-22.46,51.46v46.21Zm42.21-47.47h-23.35c.68-27.79,23.49-50.19,51.45-50.19h23.34c-.67,27.79-23.49,50.19-51.44,50.19Z"
    />
  </svg>
);
