import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const history = [];
function calculate(operation) {
    return eval(operation);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/calculate/:operation', (req, res) => {
    const operation = req.params.operation;
    try {
        const result = calculate(operation);
        history.unshift({ question: operation, answer: result });
        if (history.length > 20) {
            history.pop();
        }
        res.json({ question: operation, answer: result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid operation' });
    }
});

app.get('/history', (req, res) => {
    res.json(history);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

