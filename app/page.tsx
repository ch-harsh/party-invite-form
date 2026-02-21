"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Invitation saved successfully 🎉");
      setFormData({ name: "", email: "", phone: "" });
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #ff758c, #ff7eb3)"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "10px",
        width: "350px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center"
      }}>
        <h1>🎉 Party Invitation Form</h1>
        <p>Please fill your details to receive invite</p>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
  
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
  
          <input
            type="tel"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
  
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#ff758c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
