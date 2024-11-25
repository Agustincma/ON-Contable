const { spawn } = require("child_process");

const dockerComposePath = "./docker/";
const command = "docker-compose";
const args = ["up"];

console.log("Iniciando el proyecto con Docker Compose...");

const process = spawn(command, args, {
  cwd: dockerComposePath,
  stdio: "inherit",
  shell: true,
});

process.on("close", (code) => {
  if (code === 0) {
    console.log("Proyecto iniciado correctamente.");
  } else {
    console.error(`Error al iniciar el proyecto (código ${code}).`);
  }
});
