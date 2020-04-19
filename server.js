const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
// serve the contents of the docs folder
app.use(express.static(path.join(__dirname, "docs")));
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "docs", "index.html"));
});
app.listen(port, () => console.log(`Server started on port ${port} 🚀`));
