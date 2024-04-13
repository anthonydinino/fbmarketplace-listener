const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="lg:w-1/2 w-96">{children}</div>
    </div>
  );
};

export default Layout;
