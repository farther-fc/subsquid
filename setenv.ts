import fs from "fs";
import YAML from "yaml";
import { ENVIRONMENT } from "./src/constants";

const file = fs.readFileSync("./squid.yaml", "utf8");

const squidConfig = YAML.parse(file);

squidConfig.name = `farther-${ENVIRONMENT}`;

fs.writeFileSync("./squid.yaml", YAML.stringify(squidConfig));
