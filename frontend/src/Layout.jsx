const Layout = ({ children, extra }) => {
  return (
    <div className={`grid auto-cols-fr grid-flow-col gap-3 p-3 ${extra}`}>
      {children}
    </div>
  );
};

export default Layout;
