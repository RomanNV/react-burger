import React from "react";
import { AppHeader } from "../AppHeader/AppHeader";

export const LayoutWithHeader = ({ children }: any) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};
