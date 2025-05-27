import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isLoading, isError, error } = useLogin();
  const navigate = useNavigate(); // Hook để điều hướng

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }, {
      onSuccess: () => {
        // Điều hướng đến trang Home khi đăng nhập thành công
        navigate('/'); // Đường dẫn đến trang chủ (home)
      },
      onError: (error) => {
        console.error("Login failed", error);
      }
    });
  };

    return (
        <div className="admin-login-container">
            {/* Background Effects */}
            <div className="background-effect-top"></div>
            <div className="background-effect-bottom"></div>

            {/* Film Strip Top */}
            <div className="film-strip"></div>

            <div className="form-container">
                {/* Logo Section */}
                <div className="logo-section">
                    <div className="logo-icon">
                        {/* Film Icon */}
                        <div className="film-icon">
                            <div className="film-bar"></div>
                            <div className="film-middle">
                                <div className="film-dot-left"></div>
                                <div className="film-dot-right"></div>
                            </div>
                            <div className="film-bar"></div>
                        </div>
                    </div>
                    <h1 className="logo-title">CinemaAdmin</h1>
                    <p className="logo-subtitle">Quản lý hệ thống rạp chiếu phim</p>
                </div>

                {/* Login Form */}
                <div className="form-box">
                    <div className="form-header">
                        <h2 className="form-title">Đăng Nhập Admin</h2>
                    </div>

                    {isError && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="form-fields">
                        {/* Username Field */}
                        <div className="input-group">
                            <label className="input-label">Tên đăng nhập</label>
                            <div className="input-wrapper">
                                <div className="input-icon">👤</div>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Nhập tên đăng nhập"
                                    className="input-field"
                                />
                            </div>
                        </div>
                        
                        {/* Password Field */}
                        <div className="input-group">
                            <label className="input-label">Mật khẩu của bạn</label>
                            <div className="input-wrapper">
                                <div className="input-icon">🔒</div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Nhập mật khẩu"
                                    className="input-field"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-password"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="submit-button"
                        >
                            {isLoading ? (
                                <div className="loading-container">
                                    <div className="spinner"></div>
                                    Đang đăng nhập...
                                </div>
                            ) : (
                                '🎬 Đăng Nhập'
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="footer">
                    <p>© 2024 CinemaAdmin. Bảo mật và tin cậy.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;