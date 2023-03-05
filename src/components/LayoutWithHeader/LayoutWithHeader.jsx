import AppHeader from "../AppHeader/AppHeader";

export const LayoutWithHeader = ({ children }) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};
