const Layout = ({ children, extra }) => {
  return (
    <div className={`flex flex-col items-center ${extra}`}>
      <div className="w-11/12 md:w-1/2 lg:w-2/3 xl:w-1/2">{children}</div>
    </div>
  );
};

export default Layout;
