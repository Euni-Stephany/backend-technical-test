const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

app.get("/users", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Lydia",
            email: "lydia@example.com"
        },
        {
            id: 2,
            name: "steph",
            email: "steph@example.com"
        },
    ]);
});