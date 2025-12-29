import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

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

      {result !== null && (
        <h3>
          {result ? "❌ Password Breached" : "✅ Password Safe"}
        </h3>
      )}
    </div>
  );
}

export default App;

