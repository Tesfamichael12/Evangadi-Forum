import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChatBot from "./Components/ChatBot";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import HashLoader from "react-spinners/HashLoader";
import ScrollToTopButton from "./Components/ScrollToTopButton/ScrollToTopButton";

const Home = React.lazy(() => import("./Pages/Home"));
const Landing = React.lazy(() => import("./Pages/Landing"));
const AskQuestions = React.lazy(() => import("./Pages/AskQuestions"));
const QuestionDetail = React.lazy(() =>
  import("./Pages/QuestionDetailAndAnswer")
);
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const ForgotPassword = React.lazy(() =>
  import("./Pages/forgotpassword/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./Pages/forgotpassword/ResetPassword")
);
const Profile = React.lazy(() => import("./Pages/Profile"));
const HowItWorks = React.lazy(() => import("./Pages/HowItWorks/HowItWorks"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ScrollToTopButton />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <HashLoader color={"#007bff"} />
            <p style={{ marginTop: "1rem" }}>Loading . . .</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route
            path="/ask-questions"
            element={
              <ProtectedRoute>
                <AskQuestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question-detail/:question_uuid"
            element={<QuestionDetail />}
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Landing />} />
          <Route path="/sign-up" element={<Landing />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/profile/:user_uuid"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatBot />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
