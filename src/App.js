import { Auth } from "./views/auth/Auth";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./views/homepage/HomePage";
import { RequireAuth } from "./hoc/RequireAuth";
import { UserPage } from "./views/userpage/UserPage";
import { Context } from "./context/Context";
import { PageNotFound } from "./views/pagenotfound/PageNotFound";
import { Layout } from "./common/Layout";
import { RestoreModal } from "./components/restoremodal/RestoreModal";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { EditModal } from "./components/editmodal/EditModal";

function App() {
  return (
    <Context>
      {/* Компонент оповещений */}
      <ToastContainer />
      <Router>
        <Routes>
          {/* Страница не найдена (некорректный URL) */}
          <Route path="*" element={<PageNotFound />} />

          {/* Страница авторизации */}
          <Route path="/auth" element={<Auth />}>
            <Route path="respas" element={<RestoreModal />} />
          </ Route>
          <Route path="/" element={<Layout />}>
            {/* Роут на страницу конкретного пользователя */}

            <Route path="/user/:id" element={
              // сначала проверяет, авторизован ли пользователь

              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }>
            <Route path="edit/:resourceId" element={<EditModal />} />
              <Route path="push" element={<EditModal />} />
            </Route>

            {/* Роут на домашнюю страницу */}
            <Route index path="/" element={
              // сначала проверяет, авторизован ли пользователь
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            } />
          </Route>
        </Routes>
      </Router>

    </Context>
  );
}
export default App;