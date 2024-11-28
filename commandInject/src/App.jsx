import { useState } from 'react';
import './App.css';

function App() {
  const [target, setTarget] = useState('');
  const [target2, setTarget2] = useState('');
  const [targetd, setTargetd] = useState('');
  const [targetd2, setTargetd2] = useState('');
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();

    if (!target || !target2) {
      setError('Both targets are required');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('http://localhost:3000/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target, target2 }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setOutput("" + data.command_output); // Assuming backend sends plain text or JSON output
      } else {
        setError(data.error || 'Error executing the command');
      }
    } catch (err) {
      setError('Failed to connect to the backend');
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();

    if (!targetd || !targetd2) {
      setError('Both targets are required');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('http://localhost:3000/decrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetd, targetd2 }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setOutput("" + data.command_output); // Assuming backend sends plain text or JSON output
      } else {
        setError(data.error || 'Error executing the command');
      }
    } catch (err) {
      setError('Failed to connect to the backend');
    } finally {
      setLoading(false);
    }
  };

  // Render the command output with structured visualization
  const renderOutput = () => {
    if (!output) return null;

    // Split the output into lines for better visualization

    return (
      <div className="mt-8 max-w-4xl mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Command Output</h2>
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
          {output}
        </pre>
      </div>
    );
  };

  return (
    <div className="App p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">
        Enkripsi Password
      </h1>

      <form onSubmit={handleScan} className="flex flex-col items-center mb-8 space-y-4">
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter first parameter"
          className="p-3 border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-80"
        />
        <input
          type="text"
          value={target2}
          onChange={(e) => setTarget2(e.target.value)}
          placeholder="Enter second parameter"
          className="p-3 border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-80"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Execute
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
      <div className="App p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">
        Dekripsi Password
      </h1>

      <form onSubmit={handleDecrypt} className="flex flex-col items-center mb-8 space-y-4">
        <input
          type="text"
          value={targetd}
          onChange={(e) => setTargetd(e.target.value)}
          placeholder="Enter first parameter"
          className="p-3 border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-80"
        />
        <input
          type="text"
          value={targetd2}
          onChange={(e) => setTargetd2(e.target.value)}
          placeholder="Enter second parameter"
          className="p-3 border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-80"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Execute
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

      {renderOutput()}
    </div>
    </div>
    
  );
}

export default App;
