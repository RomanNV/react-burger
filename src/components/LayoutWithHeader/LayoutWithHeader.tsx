import { AppHeader } from "../AppHeader/AppHeader";

export const LayoutWithHeader: React.FC = ({ children }: any) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};
