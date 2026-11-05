import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles.css"

// Unlisted /encuesta page — rendered instead of the landing page, and
// lazy-loaded so its code stays out of the main bundle.
const SurveyPage = lazy(() => import("./components/survey/SurveyPage"))
const isSurvey =
  window.location.pathname.replace(/^\/+|\/+$/g, "") === "encuesta"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isSurvey ? (
      <Suspense fallback={null}>
        <SurveyPage />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
)
