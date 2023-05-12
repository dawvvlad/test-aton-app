import { Auth } from "./views/auth/Auth";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./views/homepage/HomePage";
import { RequireAuth } from "./hoc/RequireAuth";
import { UserPage } from "./views/userpage/UserPage";
import { Context } from "./context/Context";

function App() {
  return (
    <Context>
      <Router>
        <Routes>
          <Route path="/user/:id" element={ 
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }/>
          <Route path="/" element={ 
            <RequireAuth>
              <HomePage />
            </RequireAuth>
           }/>
          <Route path="*" element={<Navigate to="/" />}/>
          

          
          <Route path="auth" element={<Auth />}/>
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
