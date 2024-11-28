const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(`
        <h1>Command Injection API (Windows)</h1>
        <p>Use the API endpoint to scan with nmap:</p>
        <pre>POST /scan</pre>
        <p>Body: { "target": "127.0.0.1" }</p>
    `);
});

app.post('/scan', (req, res) => {
    const target = req.body.target;

    if (!target) {
        return res.status(400).json({
            error: "Target parameter is required"
        });
    }

    // Vulnerable command construction: no sanitization of user input!
    const command = `cmd.exe /C py abah.py ${target}`;  // `nmap` with the user input

    // Execute the command
    exec(command, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (stderr) {
            return res.status(500).json({
                stderr: stderr
            });
        }

        // Respond with the structured JSON output
        res.json({
            target: target,
            nmap_output: stdout
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
