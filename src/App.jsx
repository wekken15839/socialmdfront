import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PostsPage } from "./pages/PostsPage";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./layouts/NavBar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PostsProvider } from "./contexts/PostsContext";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <>
      <AuthProvider>
        <PostsProvider>
          {/* BROWSER ROUTER */}
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PostsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
