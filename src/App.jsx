import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { PostsPage } from "./pages/PostsPage";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./layouts/NavBar";
import { PostsProvider } from "./contexts/PostsContext";

function App() {
  return (
    <>
      <AuthProvider>
        <PostsProvider>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/posts" element={<PostsPage />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </PostsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
