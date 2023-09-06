import { Mixpanel } from "mixpanel-react-native";
import mixpanelConfig from "../../mixpanel.config";

type EventProperties = { [key: string]: any };

let isMixpanelInit = false;
let mixpanel: Mixpanel;

export const init = () => {
  if (isMixpanelInit) {
    return;
  }
  mixpanel = new Mixpanel(mixpanelConfig.key, true);
  mixpanel.init();
  isMixpanelInit = true;
};

const track = (event: string, props?: EventProperties) =>
  mixpanel.track(event, props);

const eventsLogger = {
  track,
};

export default eventsLogger;
