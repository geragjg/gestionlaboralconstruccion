import logo from './logo.svg';
import './App.css';
import Page from './components/page';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './components/helpers/authContext';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <LoginPage/>
      </div>
    </AuthProvider>
  );
}

export default App;
