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
    <div className="App p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">
        Nmap Scan Free
      </h1>

      <form onSubmit={handleScan} className="flex justify-center mb-8">
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target (e.g., 127.0.0.1)"
          className="p-3 border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-80 mr-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Scan
        </button>
      </form>

      {loading && (
        <div className="text-center text-blue-600 font-medium">Loading...</div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium mb-6">
          {error}
        </div>
      )}

      {output && (
        <div className="mt-8 max-w-4xl mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Scan Results</h2>
          <pre className="text-sm bg-gray-900 text-white p-4 rounded-lg overflow-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
