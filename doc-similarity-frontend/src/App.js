import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [file1Text, setFile1Text] = useState("");
  const [file2Text, setFile2Text] = useState("");
  const [differences, setDifferences] = useState([]);
  const [score, setScore] = useState(null);
  const [diffList, setDiffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileRead = (file, setter) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setter(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleCompare = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text1: file1Text,
          text2: file2Text,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDiffList(data.differences);

        const changes = data.differences
          .filter((part) => part.added || part.removed)
          .map((part) => part.value.trim())
          .filter((val) => val !== "");

        setDifferences(changes);
        setScore(data.similarityScore);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const renderDiff = (diffList) => {
    return diffList.map((part, index) => {
      let className = "";
      if (part.added) className = "added";
      else if (part.removed) className = "removed";

      return (
        <span key={index} className={className}>
          {part.value}
        </span>
      );
    });
  };

  return (
    <div className="container">
      <h1>📄 Text File Comparator</h1>

      <input
        type="file"
        accept=".txt"
        onChange={(e) => handleFileRead(e.target.files[0], setFile1Text)}
      />
      <input
        type="file"
        accept=".txt"
        onChange={(e) => handleFileRead(e.target.files[0], setFile2Text)}
      />
      <button onClick={handleCompare} disabled={loading || !file1Text || !file2Text}>
        {loading ? "Comparing..." : "Compare"}
      </button>

      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}

      {score !== null && (
        <div className="score">
          Similarity Score:
          <span
            style={{
              backgroundColor: score >= 0.8 ? "#2e7d32" : score >= 0.5 ? "#f9a825" : "#c62828",
              color: "#fff",
              padding: "0.2rem 0.7rem",
              marginLeft: "0.5rem",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {score}
          </span>
        </div>
      )}

      {differences.length > 0 && (
        <div className="text-block" style={{ width: "100%", marginBottom: "1.5rem" }}>
          <h4>🧾 Differences</h4>
          <pre>
            {differences.map((diff, index) => (
              <div key={index}>• {diff}</div>
            ))}
          </pre>
        </div>
      )}

      <div className="section-wrapper">
        <div className="text-block">
          <h4>📄 File 1 Content</h4>
          <pre>{file1Text}</pre>
        </div>

        <div className="text-block">
          <h4>📄 File 2 Content</h4>
          <pre>{file2Text}</pre>
        </div>

        <div className="text-block">
          <h4>🔍 Highlighted Diff</h4>
          <pre>{renderDiff(diffList)}</pre>
        </div>
      </div>
    </div>
  );
};

export default App;
