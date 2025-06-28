import React, { useState } from "react";
import axios from "axios";

const SimplifyPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/simplify_pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.summary) {
        setResult(response.data.summary);
      } else {
        setError("No simplified content received.");
      }
    } catch (err) {
      console.error("❌ Error simplifying PDF:", err);
      setError("Failed to simplify PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Simplify Your Insurance Policy</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        style={styles.input}
      />
      <button onClick={handleUpload} disabled={loading} style={styles.button}>
        {loading ? "Simplifying..." : "Upload & Simplify"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <div style={styles.resultBox}>
          <h3 style={styles.resultTitle}>📝 Simplified Summary:</h3>
          <pre style={styles.resultText}>{result}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "sans-serif",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  input: {
    display: "block",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  resultBox: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
  },
  resultTitle: {
    marginBottom: "10px",
    fontWeight: "bold",
    fontSize: "18px",
  },
  resultText: {
    whiteSpace: "pre-wrap",
    fontSize: "16px",
    color: "#444",
  },
};

export default SimplifyPage;
