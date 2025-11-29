const fs = require('fs');
const https = require('https');

const file = fs.createWriteStream("public/fonts/Roboto-Regular.ttf");
const request = https.get("https://raw.githubusercontent.com/expo/google-fonts/main/font-packages/roboto/700Bold/Roboto_700Bold.ttf", function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => {
        console.log("Download completed.");
        console.log("File size:", fs.statSync("public/fonts/Roboto-Regular.ttf").size);
    });
  });
}).on('error', function(err) { // Handle errors
  fs.unlink("public/fonts/Roboto-Regular.ttf"); // Delete the file async. (But we don't check the result)
  console.error("Error downloading:", err.message);
});
