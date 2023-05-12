import { Auth } from "./views/auth/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./views/homepage/HomePage";
import { RequireAuth } from "./hoc/RequireAuth";
import { UserPage } from "./views/userpage/UserPage";
import { Context } from "./context/Context";
import { PageNotFound } from "./views/pagenotfound/PageNotFound";
import { Layout } from "./common/Layout";

function App() {
  return (
    <Context> 
      <Router>
        <Routes>
          {/* Страница не найдена (некорректный URL) */}
          <Route path="*" element={<PageNotFound/>}/>

            {/* Страница авторизации */}
          <Route path="auth" element={<Auth />}/>

          <Route path="/" element={ <Layout /> }>
              {/* Роут на страницу конкретного пользователя */}
              
            <Route path="/user/:id" element={ 
              // сначала проверяет, авторизован ли пользователь
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }/>

            {/* Роут на домашнюю страницу */}
            <Route path="/" element={ 
              // сначала проверяет, авторизован ли пользователь
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }/>
          </Route>
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
