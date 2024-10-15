export const AuthenticationResponse = (response) => {
    return {
        error: response.error,
        message: response.message || 'An error occurred',
        user: response.user || null,
        tokenUser: response.tokenUser
    };
};