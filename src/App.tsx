import "devextreme/dist/css/dx.light.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import Loading from "./components/Loading/Loading";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

dayjs.locale("pl");

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Wykres = lazy(() => import("./pages/Wykres/Wykres"));
const Home = lazy(() => import("./pages/Home/Home"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const ProjectTasks = lazy(() => import("./pages/ProjectTasks/ProjectTasks"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

// Route configuration
const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/settings", element: <Settings />, protected: true },
  { path: "/wykres", element: <Wykres />, protected: true },
  { path: "/", element: <Home />, protected: true },
  { path: "/projects", element: <Projects />, protected: true },
  {
    path: "/projects/:projectId/tasks",
    element: <ProjectTasks />,
    protected: true,
  },
  { path: "*", element: <PageNotFound /> },
];

function App() {
  // useEffect(() => {
  //   // Check if the redirect sessionStorage item exists
  //   const redirect = sessionStorage.redirect;
  //   delete sessionStorage.redirect; // Clean up the redirect sessionStorage item
  //   if (redirect && redirect !== window.location.href) {
  //     // Use history to push the corrected path
  //     window.history.pushState(null, "", redirect.split("/").pop());
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter basename="/OnTrack.Frontend.React">
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
              {routes.map(({ path, element, protected: isProtected }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? (
                      <ProtectedRoute>{element}</ProtectedRoute>
                    ) : (
                      element
                    )
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
