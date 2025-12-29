import { useState } from "react";

const calculateStrength = (password) => {
  let score = 0;

  if (password.length >= 12) score += 30;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 20;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  return score;
};

function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const strength = calculateStrength(password);

  const checkPassword = async () => {
    const res = await fetch("http://localhost:5000/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setResult(data.breached);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>SecurePass 🔐</h1>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={checkPassword}>Check Password</button>

      <br /><br />

      <div>
        <strong>Password Strength:</strong> {strength}/100
      </div>

      <div
        style={{
          width: "300px",
          height: "10px",
          background: "#ddd",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            width: `${strength}%`,
            height: "10px",
            background:
              strength < 40 ? "red" : strength < 70 ? "orange" : "green",
          }}
        ></div>
      </div>

      <div>
        {strength < 40 && "❌ Weak Password"}
        {strength >= 40 && strength < 70 && "⚠️ Medium Password"}
        {strength >= 70 && "✅ Strong Password"}
      </div>

      {result !== null && (
        <h3>
          {result ? "❌ Password Breached" : "✅ Password Safe"}
        </h3>
      )}
    </div>
  );
}

export default App;
