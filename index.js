const express = require("express");

// Import the filesystem module
const fs = require('fs');


const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));


// fake db
const fakeDB = [];


app.post("/api", (request, response) => {
  console.log("I got a request!");
  console.log(request.body);
  const data = request.body;

    fakeDB.push(data);

    const dataForFile = JSON.stringify(fakeDB);
    fs.writeFile('data_file.txt', dataForFile, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("data_file.txt", "utf8"));
        }
      });

  response.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
  });

  console.log(fakeDB);

});

