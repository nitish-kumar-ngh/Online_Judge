const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`); // .exe for Windows

  return new Promise((resolve, reject) => {
    const command = `g++ "${filepath}" -o "${outPath}" && "${outPath}" < "${inputPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject({ error: error.message, stderr });
      }
      return resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
