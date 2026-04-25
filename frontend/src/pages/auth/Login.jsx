import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({ email, password });

      console.log("Login response:", res.data);

      if (res.data.success) {
        const accessToken = res.data?.data?.accessToken;
        const user = res.data?.data?.user;

        if (!accessToken) {
          toast.error("Token not received from server");
          return;
        }

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <div className="auth-brand">
          <div className="auth-logo">AE</div>
          <div>
            <h1>AI-ERP-CLOUD-SUITE</h1>
            <p>Sign in to continue to your dashboard</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="auth-row">
            <label className="checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don’t have an account?</span>
          <button className="link-btn" onClick={() => navigate("/register")}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}