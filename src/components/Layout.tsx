import NavBar from "./NavBar";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
