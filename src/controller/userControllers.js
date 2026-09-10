const db = require("../database/database");

// Method - Get
const getUsers = (req, res) => {
    const userGetAll = db
    .prepare("SELECT * FROM users")
    .all();
    res.json(userGetAll);
};
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};

//Method - Post
const createUser = (req, res) => {
    const{name, email} = req.body;

    //validate name
    if(!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Name is required" });
    }

    //validate email
    if(!email || typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ message: "Email is required" });
    }

    //validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const result = db
    .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    .run(name.trim(), email.trim());

    const newUser = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(result.lastInsertRowid);

    res.status(201).json(newUser);
};

//Method - Patch
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const {name, email} = req.body;
    
    //validate name is provided
    if (name!==undefined){
        if(!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ message: "Name must be a non-empty string" });
        }
    }
    if (email!==undefined){
        if(!email || typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({ message: "Email must be a non-empty string" });
        }
        //validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
    }

    const updatedName = name !== undefined ? name.trim() : user.name;
    const updatedEmail = email !== undefined ? email.trim() : user.email;

    db.prepare(`
        UPDATE users 
        SET name = ?, 
        email = ? 
        WHERE id = ?`
    ).run(updatedName, updatedEmail, id);

    const updatedUser = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id);

    res.json(updatedUser);
};

//Method - Delete
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    db.prepare("DELETE FROM users WHERE id = ?").run(id);
    
    res.json({ message: "User deleted successfully" });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};