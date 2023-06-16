export const checkPageLocation = (pathname) => {
  const pathnames = ["/login", "/signup"];
  return pathnames.find((item) => item === pathname) ? true : false;
};
