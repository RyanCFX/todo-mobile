import { DimensionValue } from "react-native";

export function getInputWidth(
  preffix?: boolean,
  suffix?: boolean,
  error?: boolean,
  suffixWidth?: number
): DimensionValue {
  let width = 100;

  if (preffix) {
    width -= 10;
  }

  if ((suffix && !suffixWidth) || error) {
    width -= 10;
  }

  if (suffixWidth) {
    width -= suffixWidth;
  }

  return `${width}%`;
}
