import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <React.Fragment>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </React.Fragment>
  );
};

export default App;
