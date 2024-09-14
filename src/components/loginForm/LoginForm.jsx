"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Button_one from "../customButtons/Button_one";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (email && password) {
      setLoading(true);
      login();
    }
  };

  const login = () => {
    // Implement login logic here
    setTimeout(() => {
      alert("login");
      setLoading(false);
    }, 5000);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="البريد الألكتروني"
        className="h-12 p-3 placeholder:text-right text-sm placeholder:text-sm placeholder:text-zinc-400 placeholder:h-6 mb-2"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="كلمة المرور"
        className="h-12 p-3 placeholder:text-right text-sm placeholder:text-sm placeholder:text-zinc-400 placeholder:h-6 mb-2"
      />
      <Button_one page="login" loading={loading} />
    </form>
  );
}

export default LoginForm;
