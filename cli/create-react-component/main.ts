import { exec, args, cmd } from "./context";
import { Path } from "./System/IO/Path"

let main = () => {
    let projectDirectory = args[0];
    if (cmd(projectDirectory, `npm init -y`) != 0) {
        return -1;
    }
    let packagePath = Path.Combine(projectDirectory, "package.json");
    let packageJson = Json
};