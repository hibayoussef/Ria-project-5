const path = require("path");
const express = require("express");
const app = express();

// Telling express to serve pages from public folder
const publicPath = path.join(__dirname, "..", "build");
app.use(express.static(publicPath));
console.log({ publicPath });

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up & running on port ${port}`);
});
