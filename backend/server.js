require("dotenv").config();
const app = require('./src/app');
require('./src/config/db');

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`PostgreSQL Connected`);
});