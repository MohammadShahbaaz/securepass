import { useState } from "react";
import "./App.css";

const calculateStrength = (password) => {
  let score = 0;

  if (password.length >= 12) score += 30;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 20;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  return score;
};

const getPasswordTips = (password) => {
  const tips = [];

  if (password.length < 12) {
    tips.push("Increase length to at least 12 characters");
  }
  if (!/[A-Z]/.test(password)) {
    tips.push("Add at least one uppercase letter (A-Z)");
  }
  if (!/[a-z]/.test(password)) {
    tips.push("Add at least one lowercase letter (a-z)");
  }
  if (!/[0-9]/.test(password)) {
    tips.push("Add at least one number (0-9)");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    tips.push("Add at least one special character (!@#$...)");
  }

  return tips;
};

function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const [showPassword, setShowPassword] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const strength = calculateStrength(password);
  const tips = getPasswordTips(password);


  const checkPassword = async () => {
  setLoading(true);
  setError("");
  setResult(null);

  try {
    const res = await fetch("http://localhost:5000/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();
    setResult(data.breached);
  } catch (err) {
    setError("🛠️ Server is under maintenance. Please check back later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container">
      <div className="card">
        <h1>SecurePass 🔐</h1>

        <div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#22c55e",
      fontSize: "14px",
      userSelect: "none",
    }}
    title={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>


        <button onClick={checkPassword} disabled={loading || !password}>
          {loading ? "Checking..." : "Check Password"}
        </button>


        <div style={{ marginTop: "15px" }}>
          <strong>Password Strength:</strong> {strength}/100
        </div>

        <div className="strength-bar">
          <div
            className="strength-fill"
            style={{
              width: `${strength}%`,
              background:
                strength < 40
                  ? "#ef4444"
                  : strength < 70
                  ? "#f59e0b"
                  : "#22c55e",
            }}
          ></div>
        </div>

        <div className="result">
          {strength < 40 && "❌ Weak Password"}
          {strength >= 40 && strength < 70 && "⚠️ Medium Password"}
          {strength >= 70 && "✅ Strong Password"}
        </div>

        {result !== null && (
          <div className="result">
            {result
              ? "❌ Password Found in Data Breach"
              : "✅ Password Is Safe"}
          </div>
        )}
        {error && (
          <div className="result" style={{ color: "#ef4444" }}>
            {error}
          </div>
        )}

        {password && (
  <div style={{ marginTop: "15px", fontSize: "13px" }}>
    <strong>Improvement Tips:</strong>
    <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
      {tips.length === 0 ? (
        <li style={{ color: "#22c55e" }}>✅ Your password is strong</li>
      ) : (
        tips.map((tip, index) => (
          <li key={index} style={{ color: "#facc15" }}>
            ⚠️ {tip}
          </li>
        ))
      )}
    </ul>
  </div>
)}

      </div>
    </div>
  );
}

export default App;
