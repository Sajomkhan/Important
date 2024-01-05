const app = require('./app')
const connectDB = require('./db/connection');
require('dotenv').config()

const PORT = process.env.PORT || 5010;

connectDB()


app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});