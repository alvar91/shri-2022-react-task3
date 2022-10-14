import { Route, Routes } from "react-router-dom";

import BoardPage from "./pages/BoardPage/BoardPage";
import TaskPage from "./pages/TaskPage/TaskPage";

import "normalize.css";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/full/:taskId/*" element={<TaskPage />} />
        <Route path="*" element={<BoardPage />} />
      </Routes>
    </div>
  );
}
