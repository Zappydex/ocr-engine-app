import api from '../apiConfig';

// Authentication services
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/accounts/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const registerWithGoogle = async (credential) => {
  try {
    const response = await api.post('/api/accounts/google/login/', { token: credential });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    console.error('Google registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/accounts/login/', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const loginWithGoogle = async (credential) => {
  try {
    const response = await api.post('/api/accounts/google/login/', { token: credential });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    console.error('Google login error:', error.response?.data || error.message);
    throw error;
  }
};

export const checkGoogleAuthStatus = async () => {
  try {
    const response = await api.get('/api/accounts/google/auth/');
    return response.data;
  } catch (error) {
    console.error('Google auth status error:', error.response?.data || error.message);
    throw error;
  }
};

export const verifyOTP = async (otpData) => {
  try {
    const response = await api.post('/api/accounts/verify-otp/', otpData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('OTP verification error:', error.response?.data || error.message);
    throw error;
  }
};

export const resendOTP = async (email) => {
  try {
    const response = await api.post('/api/accounts/resend-otp/', email);
    return response.data;
  } catch (error) {
    console.error('Resend OTP error:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/api/accounts/logout/');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
    throw error;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/api/accounts/request-reset-email/', email);
    return response.data;
  } catch (error) {
    console.error('Password reset request error:', error.response?.data || error.message);
    throw error;
  }
};

export const resetPassword = async (uidb64, token, passwords) => {
  try {
    const response = await api.post('/api/accounts/password-reset-complete/', {
      uidb64,
      token,
      ...passwords
    });
    return response.data;
  } catch (error) {
    console.error('Password reset error:', error.response?.data || error.message);
    throw error;
  }
};

export const checkPasswordResetToken = async (uidb64, token) => {
  try {
    const response = await api.get(`/api/accounts/password-reset/${uidb64}/${token}/`);
    return response.data;
  } catch (error) {
    console.error('Password reset token check error:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/api/accounts/profile/');
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/api/accounts/profile/', profileData);
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error.response?.data || error.message);
    throw error;
  }
};

export const checkActivationToken = async (uidb64, token, userId) => {
  try {
    const response = await api.get(`/activate/${uidb64}/${token}/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Token check error:', error.response?.data || error.message);
    throw error;
  }
};

export const confirmAccountActivation = async (uidb64, token, userId) => {
  try {
    const response = await api.post(`/activate/${uidb64}/${token}/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Account activation error:', error.response?.data || error.message);
    throw error;
  }
};

export const resendActivationEmail = async (email) => {
  try {
    const response = await api.post('/api/accounts/resend-activation/', email);
    return response.data;
  } catch (error) {
    console.error('Resend activation error:', error.response?.data || error.message);
    throw error;
  }
};
