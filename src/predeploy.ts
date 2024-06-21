import fs from "fs";
import YAML from "yaml";
import { ENVIRONMENT } from "./constants";

const file = fs.readFileSync("./squid.yaml", "utf8");

const squidConfig = YAML.parse(file);

squidConfig.name = `farther-${ENVIRONMENT}`;
squidConfig.deploy.env.ENVIRONMENT = ENVIRONMENT;
squidConfig.scale.dedicated = ENVIRONMENT === "production" ? true : false;

fs.writeFileSync("./squid.yaml", YAML.stringify(squidConfig));
