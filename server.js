import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("short"));
app.use(express.static("public"))

app.get("/", (req, res) => {
  const names = [
    "Ankit Khanal",
    "Hridaya Dev Dhungana",
    "Sujan Puri",
    "Kamal Guragain",
    "Tikaram Guragain",
    "Nishan Gautam",
  ];

  res.render("index.ejs", {
    title: "Nishan Gautam",
    subtitle: "Software developer",
    names,
  });
});

app.listen(8000, () => {
  console.log(`Server is on port 8000`);
});
