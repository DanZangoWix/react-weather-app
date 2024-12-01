import { createContext } from "react";
import * as types from "../types";

interface SettingsContextType {
  isLightMode: boolean;
  defaultDegree: string;
  setDefaultSettings: React.Dispatch<
    React.SetStateAction<types.defaultSettings>
  >;
}

export const SettingsContext = createContext<SettingsContextType>({
  isLightMode: true,
  defaultDegree: "C", // default values
  setDefaultSettings: () => {},
});
