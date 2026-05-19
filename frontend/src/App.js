import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReply = async () => {

    if (!name || !email) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/generate-reply",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_name: name,
            email_content: email,
            additional_context: context,
          }),
        }
      );

      const data = await response.json();

      setReply(data.reply);

    } catch (error) {

      console.error(error);
      alert("Something went wrong");

    }

    setLoading(false);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#edf7f1",
        padding: "40px",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "950px",
          margin: "auto",
          background: "white",
          borderRadius: "25px",
          padding: "40px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#2f6f4f",
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          AI Email Reply Assistant
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#5f7d6e",
            marginBottom: "35px",
            fontSize: "18px",
          }}
        >
          Generate smart professional email replies instantly
        </p>

        <label
          style={{
            fontWeight: "bold",
            color: "#2f6f4f",
          }}
        >
          Your Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}

          style={{
            width: "100%",
            padding: "14px",
            marginTop: "10px",
            marginBottom: "25px",
            borderRadius: "14px",
            border: "1px solid #cfe8d8",
            fontSize: "16px",
            background: "#f8fffa",
          }}
        />

        <label
          style={{
            fontWeight: "bold",
            color: "#2f6f4f",
          }}
        >
          Email Content
        </label>

        <textarea
          rows="8"
          placeholder="Paste the email here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}

          style={{
            width: "100%",
            padding: "16px",
            marginTop: "10px",
            marginBottom: "25px",
            borderRadius: "14px",
            border: "1px solid #cfe8d8",
            fontSize: "16px",
            background: "#f8fffa",
          }}
        />

        <label
          style={{
            fontWeight: "bold",
            color: "#2f6f4f",
          }}
        >
          Additional Context (Optional)
        </label>

        <textarea
          rows="5"
          placeholder="Explain the situation for a better reply..."
          value={context}
          onChange={(e) => setContext(e.target.value)}

          style={{
            width: "100%",
            padding: "16px",
            marginTop: "10px",
            marginBottom: "25px",
            borderRadius: "14px",
            border: "1px solid #cfe8d8",
            fontSize: "16px",
            background: "#f8fffa",
          }}
        />

        <button
          onClick={generateReply}

          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "16px",
            background: "#7cc9a5",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {loading ? "Generating..." : "Generate AI Reply"}
        </button>

        <h2
          style={{
            marginTop: "40px",
            color: "#2f6f4f",
            fontWeight: "bold",
          }}
        >
          AI Generated Reply
        </h2>

        <textarea
          rows="12"
          value={reply}
          readOnly

          style={{
            width: "100%",
            padding: "18px",
            marginTop: "15px",
            borderRadius: "16px",
            border: "1px solid #cfe8d8",
            fontSize: "16px",
            background: "#f6fff9",
            lineHeight: "1.6",
          }}
        />

      </div>

    </div>
  );
}

export default App;