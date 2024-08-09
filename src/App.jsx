import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
// additional imports
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import CreatePostPage from "./pages/CreatePage/CreatePage";
import GoalPage from "./pages/GoalPage/GoalPage";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/:username' element={<ProfilePage />} />
        {/* Added Routes */}
        <Route path='/editprofile' element={<EditProfilePage />} />
        <Route path='/create' element={<CreatePostPage />} />
        <Route path='/p/:goalId' element={<GoalPage />} />

      </Routes>
    </PageLayout>
  );
}

export default App;