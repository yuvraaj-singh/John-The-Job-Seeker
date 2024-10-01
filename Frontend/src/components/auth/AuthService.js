import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";
const SIGN_IN_WITH_GOOGLE_URL = "http://localhost:8080/oauth2/authorization/google";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials);
    }

    signInWithGoogle() {
        return axios.get(SIGN_IN_WITH_GOOGLE_URL);
    }
}

export default new AuthService();