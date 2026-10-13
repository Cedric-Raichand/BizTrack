import { ToastContainer } from "react-toastify";

import useTheme from "../hooks/useTheme";

function ThemedToastContainer() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme={theme}
    />
  );
}

export default ThemedToastContainer;