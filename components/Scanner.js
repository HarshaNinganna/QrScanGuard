import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { saveScan, getScans } from '../utils/storage';

const Scanner = ({ onScan }) => {
  const scannerRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        const added = saveScan(decodedText);
        if (added) {
          onScan();
        } else {
          setError("Scan limit reached for today (50).");
        }
        scanner.stop(); // stop after one scan
      },
      (err) => {}
    ).catch(err => setError("Camera init failed"));

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [onScan]);

  return (
    <div>
      <div id="qr-reader" style={{ width: "300px" }} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Scanner;
