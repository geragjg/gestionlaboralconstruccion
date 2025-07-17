import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/helpers/authContext';
import axios from 'axios';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let response = null;

    try {
    //   response = await axios.post('https://localhost:7263/Usuario/login', {
    //     nombreUsuario: username,
    //     contrasenha: password,
    //   });

      debugger;
    //   if (response.status === 200) {
        // Assuming the response contains a token or user information
        await login({ nombreUsuario: username, contrasenha: password });
        // Redirect or update UI as needed, e.g., history.push('/dashboard')
        console.log('Login successful!');
    //   } else {
    //     setError('Login failed: Invalid credentials.');
    //   }
    } catch (err) {
        console.log(err, response)
        setError('Login failed: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;