// src/App.jsx
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const App = () => {
  const [scans, setScans] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("qrScans")) || [];
    const now = Date.now();
    return stored.filter(scan => now - scan.timestamp < 86400000); // filter old
  });

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        const now = Date.now();
        const newScan = { text: decodedText, timestamp: now };

        setScans(prev => {
          if (prev.length >= 50) return prev;
          const updated = [...prev, newScan];
          localStorage.setItem("qrScans", JSON.stringify(updated));
          return updated;
        });

        scanner.clear();
      },
      (err) => console.warn("QR Scan Error:", err)
    );

    return () => scanner.clear();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>QR Code Scan Tracker</h1>
      <div id="qr-reader" style={{ width: "300px", marginBottom: "20px" }}></div>

      <h2>Today's Scans ({scans.length}/50)</h2>
      <ul>
        {scans.map((scan, index) => (
          <li key={index}>{scan.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
