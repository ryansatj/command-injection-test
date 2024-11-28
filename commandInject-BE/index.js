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
        <h1>Command Execution API</h1>
        <p>POST /scan</p>
        <p>Body: { "target": "parameter1", "target2": "parameter2" }</p>
    `);
});

app.post('/encrypt', (req, res) => {
    const target = req.body.target;
    const target2 = req.body.target2;

    if (!target || !target2) {
        return res.status(400).json({
            error: "Both parameters are required"
        });
    }

    const command = `cmd.exe /C py abah.py ${target} ${target2}`;

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
            target1: target,
            target2: target2,
            command_output: stdout
        });
    });
});

app.post('/decrypt', (req, res) => {
    const targetd = req.body.targetd;
    const targetd2 = req.body.targetd2;

    if (!targetd || !targetd2) {
        console.log(targetd);
        console.log(targetd2);
        return res.status(400).json({
            error: "Both parameters are required"
        });
    }

    const command = `cmd.exe /C py zhavier.py ${targetd} ${targetd2}`;

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
            targetd1: targetd,
            targetd2: targetd2,
            command_output: stdout
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
