import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 py-8 xl:px-[88px] xl:py-[99px] max-w-7xl mx-auto">
      {children}
    </div>
  );
};
export default Layout;
