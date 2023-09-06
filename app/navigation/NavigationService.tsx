import * as React from "react";
import {
  CommonActions,
  NavigationContainerRef,
} from "@react-navigation/native";
import eventsLogger from "../utils/eventUtils";

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: any) {
  eventsLogger.track("navigate", { name, params });
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}
function resetStack(name: string, params: any = {}) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: name, params: params }],
    })
  );
}

export default {
  navigate,
  goBack,
  resetStack,
};
