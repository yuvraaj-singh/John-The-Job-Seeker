export const AuthenticationRequest = (firstName, lastName, email, password, token, tokenSecret) => {
    return {
        user: {
            firstName: firstName || null,
            lastName: lastName || null,
            email: email || null,
            password: password || null
        },
        token: token || false,
        tokenSecret: tokenSecret || null
    };
};