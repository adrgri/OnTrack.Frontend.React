import "devextreme/dist/css/dx.light.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import Loading from "./components/Loading/Loading";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

dayjs.locale("pl");

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Tablica = lazy(() => import("./pages/Tablica/Tablica"));
const Home = lazy(() => import("./pages/Home/Home"));
const Projects = lazy(() => import("./pages/Projects/Projects"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/settings"
                element={
                  // <ProtectedRoute>
                  <Settings />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/tablica"
                element={
                  // <ProtectedRoute>
                  <Tablica />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  // <ProtectedRoute>
                  <Home />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  // <ProtectedRoute>
                  <Home />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  // <ProtectedRoute>
                  <Projects />
                  // </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
