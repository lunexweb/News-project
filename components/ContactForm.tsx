"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return alert("Please fill all fields.");
    // Demo: pretend to send
    setTimeout(() => setSent(true), 400);
  }

  if (sent) {
    return (
      <div className="p-6 bg-white rounded-xl border border-black/10 shadow-sm">
        <h3 className="text-xl font-bold mb-2">Thanks for reaching out!</h3>
        <p className="text-gray-700">We'll get back to you via email.</p>
        <button className="mt-4 px-4 py-2 rounded bg-cfn-red text-white" onClick={() => setSent(false)}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 bg-white p-6 rounded-xl border border-black/10 shadow-sm">
      <div>
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
        />
      </div>
      <button type="submit" className="px-4 py-2 rounded bg-cfn-red text-white font-semibold">Send</button>
    </form>
  );
}
