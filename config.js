import Config from "react-native-config";

if (__DEV__) {
  require("dotenv").config({ path: ".env.dev" });
} else {
  require("dotenv").config({ path: ".env.prod" });
}

export default {
  baseUrl: Config.BASE_URL,
};
