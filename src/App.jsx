import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer></ToastContainer>
      </QueryClientProvider>
    </div>
  );
}

export default App;
