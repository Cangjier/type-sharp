import { exec } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
exec(Environment.ProcessPath, "run", "cs2ts");