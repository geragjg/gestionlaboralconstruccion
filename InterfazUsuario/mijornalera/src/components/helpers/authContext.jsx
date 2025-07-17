import React from "react";
import axios from "axios";

// 1) Creamos el contexto de autenticación
export const AuthContext = React.createContext();

// 2) Proveedor de autenticación con clase
export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: null
    };
  }

  componentDidMount() {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      // Si hay token en localStorage, lo cargamos y lo inyectamos en Axios
      this.updateAuthState(savedToken)
    }
  }

  updateAuthState = (newToken) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    this.setState({ token: newToken });
  }

  // Método de login: pide credenciales, recibe token, guarda en estado y localStorage
  // Método de login: pide credenciales, recibe token, guarda en estado y localStorage
  login = async (credentials, redirect) => {
    const response = await axios.post("https://localhost:7263/Usuario/login", credentials);
    const newToken = response.data.token;
    localStorage.setItem("authToken", newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    this.setState({ token: newToken });
    // Opcional: guardar datos de usuario
    // this.setState({ user: response.data.user });
  };

  // Método de logout: limpia token de estado, axios y localStorage
  logout = () => {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
    this.setState({ token: null, user: null });
  };

  render() {
    const { token, user } = this.state;
    const { login, logout } = this;

    return (
      <AuthContext.Provider value={{ token, user, login, logout }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}