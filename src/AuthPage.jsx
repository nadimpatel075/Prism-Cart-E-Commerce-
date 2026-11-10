
import { useState } from "react";
import "./index.css";

const API_URL = "http://localhost:8080/api/auth";

export default function AuthPage({ onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isRegister = mode === "register";

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (
      isRegister &&
      form.password !== form.confirmPassword
    ) {
      setMessage("Your passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegister ? "register" : "login";

      const payload = isRegister
        ? {
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
          }
        : {
            email: form.email.trim(),
            password: form.password,
          };

      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Authentication failed."
        );
      }

      if (!isRegister) {
        // Expected response: { token: "...", user: { name, email } }
        if (!data.token) {
          throw new Error("The server did not return an access token.");
        }

        // Demo integration: replace with a secure auth strategy
        // appropriate for your Spring Boot backend.
        sessionStorage.setItem("commercehub_token", data.token);

        onLoginSuccess?.(data.user ?? { email: form.email });
        setMessage("Login successful.");
      } else {
        setMessage("Account created! You can now log in.");
        setForm((current) => ({
          ...current,
          password: "",
          confirmPassword: "",
        }));
        setMode("login");
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setMessage(
          "Cannot connect to the server. Check that Spring Boot is running."
        );
      } else {
        setMessage(error.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85"
          alt="Beautifully curated contemporary retail store"
        />

        <div className="auth-visual-overlay" />

        <a className="auth-brand auth-brand-light" href="#home">
          commercehub<span>.</span>
        </a>

        <div className="auth-visual-copy">
          <span className="auth-eyebrow">
            THE ART OF EVERYDAY LIVING
          </span>
          <h1>
            Good things.
            <br />
            <em>Well chosen.</em>
          </h1>
          <p>
            Thoughtfully selected essentials. Exceptional
            design. A little more meaning in the everyday.
          </p>
        </div>

        <span className="auth-visual-bottom">
          CONSIDERED DESIGN · TIMELESS ESSENTIALS
        </span>
      </section>

      <section className="auth-panel">
        <div className="auth-topbar">
          <a className="auth-brand auth-brand-dark" href="#home">
            commercehub<span>.</span>
          </a>

          {onClose && (
            <button
              className="auth-close"
              type="button"
              onClick={onClose}
            >
              Back to shop <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>

        <div className="auth-form-wrap">
          <div className="auth-heading">
            <span className="auth-eyebrow">
              {isRegister ? "YOUR JOURNEY STARTS HERE" : "WELCOME BACK"}
            </span>

            <h2>
              {isRegister ? (
                <>
                  Create your
                  <br />
                  <em>account.</em>
                </>
              ) : (
                <>
                  Good to see
                  <br />
                  <em>you again.</em>
                </>
              )}
            </h2>

            <p>
              {isRegister
                ? "Join us for considered finds and everyday favourites."
                : "Sign in to discover your favourites and manage your orders."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={!isRegister ? "active" : ""}
              onClick={() => changeMode("login")}
            >
              SIGN IN
            </button>

            <button
              type="button"
              className={isRegister ? "active" : ""}
              onClick={() => changeMode("register")}
            >
              CREATE ACCOUNT
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="auth-field">
                <span>FULL NAME</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={updateField}
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </label>
            )}

            <label className="auth-field">
              <span>EMAIL ADDRESS</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>

            <label className="auth-field">
              <span>PASSWORD</span>
              <div className="auth-password-wrap">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={updateField}
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  minLength={8}
                  maxLength={128}
                  required
                />

                <button
                  className="auth-show-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </label>

            {isRegister && (
              <label className="auth-field">
                <span>CONFIRM PASSWORD</span>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password again"
                  value={form.confirmPassword}
                  onChange={updateField}
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                />
              </label>
            )}

            {!isRegister && (
              <div className="auth-forgot-row">
                <span>Secure access to your account</span>
                <span>Forgot password?</span>
              </div>
            )}

            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "PLEASE WAIT..."
                : isRegister
                  ? "CREATE MY ACCOUNT"
                  : "SIGN IN TO YOUR ACCOUNT"}
              <span aria-hidden="true">→</span>
            </button>

            {isRegister && (
              <p className="auth-terms">
                By creating an account, you agree to our Terms of
                Service and Privacy Policy.
              </p>
            )}
          </form>

          <div className="auth-switch">
            {isRegister ? "Already a member?" : "New to CommerceHub?"}{" "}
            <button
              type="button"
              onClick={() =>
                changeMode(isRegister ? "login" : "register")
              }
            >
              {isRegister ? "Sign in" : "Create an account"}
            </button>
          </div>

          <div className="auth-assurance">
            <span>◇</span>
            SECURE ACCOUNT · THOUGHTFUL SERVICE
          </div>
        </div>
      </section>
    </main>
  );
}
