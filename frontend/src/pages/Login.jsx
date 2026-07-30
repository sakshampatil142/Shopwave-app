import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login(name.trim(), email.trim());
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <div className="bg-surface border border-border rounded-2xl p-8">
        <h1 className="font-display text-2xl font-semibold mb-1 text-ink text-center">Sign in</h1>
        <p className="text-muted text-sm text-center mb-6">
          Demo login — no password needed, this just personalizes your session.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-muted mb-1 block">Full name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Saksham Patil"
              className="w-full bg-surface2 border border-border rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-muted"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1 block">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full bg-surface2 border border-border rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-muted"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent-500 hover:bg-accent-400 text-ink font-semibold py-2.5 rounded-full transition-colors"
          >
            Continue
          </button>
        </form>
        <p className="text-xs text-muted text-center mt-6">
          <Link to="/" className="hover:text-accent-400 underline">
            Continue browsing without an account
          </Link>
        </p>
      </div>
    </div>
  );
}
