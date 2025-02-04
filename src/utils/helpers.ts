import { ErrorProps, ModalName } from "../types";
import { Subject } from "rxjs";
import { Linking, PixelRatio, Platform } from "react-native";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { CODE_MESSAGES } from "@/constants/errors";
import * as Clipboard from "expo-clipboard";

export const ModalOpener$ = new Subject<{ name: ModalName; extra?: any }>();

export const format = {
  cardId: (cardId: string) => {
    if (cardId?.length !== 11) {
      return cardId;
    } else {
      return (
        cardId.substring(0, 3) +
        "-" +
        cardId.substring(3, 10) +
        "-" +
        cardId.substring(10)
      );
    }
  },
  hour: (date: Date) => {
    if (date?.getHours() > 12) {
      return `${date?.getHours() - 12} : ${date?.getMinutes()} PM`;
    }
    return `${date?.getHours()} : ${date?.getMinutes()} AM`;
  },
  phone: (phone: string) => {
    if (!phone) {
      return "";
    }

    if (phone.length != 10) {
      return phone;
    }

    return `(${phone.substring(0, 3)}) ${phone.substring(
      3,
      6
    )}-${phone.substring(6)}`;
  },
  day: (day: number) => {
    const days: any = {
      1: "Lunes",
      2: "Martes",
      3: "Miercoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sabado",
      7: "Domingo",
    };

    return days[day] || "";
  },
  month: (month: number) => {
    const months: any = {
      1: "Enero",
      2: "Febrero",
      3: "Marzo",
      4: "Abril",
      5: "Mayo",
      6: "Junio",
      7: "Julio",
      8: "Agosto",
      9: "Septiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre",
    };

    return months[month] ?? "";
  },
  money: (number?: number, currency?: string): string => {
    if (!number) {
      return "";
    }
    const formated = new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: currency ?? "DOP",
      minimumFractionDigits: 2,
    });

    return formated.format(number);
  },
  error: (error: any): ErrorProps => {
    return {
      code: "Oops...",
      error: true,
      message:
        CODE_MESSAGES[error?.code] ||
        error?.response?.data?.errors?.[0] ||
        "Ha ocurrido un error inesperado.",
    };
  },
  date: (date: Date) => {
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth();
    const year = date.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }

    // if (day < 10) {
    //   day = `0${day}`;
    // }

    return `${day}/${monthDays[month + 1]?.name?.slice(0, 3)}/${year}`;
  },
};

export function isToday(date: Date) {
  const today = new Date();

  return (
    date?.getFullYear() === today?.getFullYear() &&
    date?.getMonth() === today?.getMonth() &&
    date?.getDate() === today?.getDate()
  );
}

export function daysInAMonth(month: number) {
  const months: { [key: number]: number } = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return months[month];
}

export function calculateArrayWithMoreElements(data: any[]): number {
  const arrays = [data];
  let longerArray = arrays[0];
  let longerArrayLength = longerArray.length;

  for (let i = 1; i < arrays.length; i++) {
    const currentLength = arrays[i].length;
    if (currentLength > longerArrayLength) {
      longerArray = arrays[i];
      longerArrayLength = currentLength;
    }
  }

  return longerArrayLength;
}

export function removeUndefinedValues(object: any) {
  for (const key in object) {
    if (object?.hasOwnProperty(key) && object[key] === undefined) {
      delete object[key];
    }
  }
  return object;
}

export function createImageFileToUpload(uri: string): any {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };

    xhr.open("GET", uri);
    xhr.responseType = "blob";
    xhr.send();
  });
}

export function openMap(location: { latitude: number; longitude: number }) {
  const url = Platform.select({
    ios: `maps://app?ll=${location?.latitude},${location?.longitude}`,
    android: `geo:${location?.latitude},${location?.longitude}?q=${location?.latitude},${location?.longitude}`,
  });

  if (url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        ModalOpener$.next({
          name: "ERROR",
          extra: { title: "No es posible abrir el mapa" },
        });
      }
    });
  }
}

export function normalizeFontSize(size: number) {
  const scale = WINDOW_WIDTH / 430;

  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 0.8;
  }
}

interface MonthDetails {
  days: number;
  name: string;
}

export interface MonthDays {
  [month: number]: MonthDetails;
}

export const monthDays: MonthDays = {
  1: { days: 31, name: "Enero" },
  2: { days: 28, name: "Febrero" },
  3: { days: 31, name: "Marzo" },
  4: { days: 30, name: "Abril" },
  5: { days: 31, name: "Mayo" },
  6: { days: 30, name: "Junio" },
  7: { days: 31, name: "Julio" },
  8: { days: 31, name: "Agosto" },
  9: { days: 30, name: "Septiembre" },
  10: { days: 31, name: "Octubre" },
  11: { days: 30, name: "Noviembre" },
  12: { days: 31, name: "Diciembre" },
};

export function extractNumbers(text: string) {
  return text.replace(/\D/g, ""); // Reemplaza todo lo que no sea número (\D) por una cadena vacía
}

export async function copyToClipboard(text: string) {
  await Clipboard.setStringAsync(text);
}
