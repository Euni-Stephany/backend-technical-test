let users = [
    {
        id: 1,
        name: "Lydia",
        email: "lydia@gmail.com",
    },
    {
        id: 2,
        name: "steph",
        email: "steph@gmail.com",
    },
]

const getUsers = (req, res) => {
    res.json(users);
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};

module.exports = {
    getUsers,
    getUserById,
};