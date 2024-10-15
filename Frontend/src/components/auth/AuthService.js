import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

class AuthService {
    register(registerRequest) {
        console.log('Register Request: ',registerRequest);
        return axios.post(`${API_BASE_URL}/auth/register`, registerRequest);
    }

    login(loginRequest) {
        console.log('Login Request: ',loginRequest);
        return axios.post(`${API_BASE_URL}/auth/login`, loginRequest);
    }

    signInWithGoogle() {
        return;
    }
}

export default new AuthService();