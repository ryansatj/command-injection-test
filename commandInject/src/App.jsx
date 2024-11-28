import { useState } from 'react';
import './App.css';

function App() {
  const [target, setTarget] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission to request a scan
  const handleScan = async (e) => {
    e.preventDefault();

    if (!target) {
      setError('Target is required');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('http://localhost:3000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.nmap_output);
      } else {
        setError(data.error || 'Error executing nmap scan');
      }
    } catch (err) {
      setError('Failed to connect to the backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App p-8">
      <h1 className="text-4xl font-bold mb-6">Command Injection Visualizer</h1>

      <form onSubmit={handleScan} className="mb-6">
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target (e.g., 127.0.0.1)"
          className="p-2 border border-gray-300 rounded mr-2 w-80"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Scan
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {output && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Scan Results</h2>
          <pre className="text-sm overflow-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
