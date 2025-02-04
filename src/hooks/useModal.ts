// MÓDULOS EXTERNOS
import { useEffect, useState } from "react";
import { filter } from "rxjs";

// MÓDULOS LOCALES
import { ModalOpener$ } from "@/src/utils/helpers";
import { ModalName } from "@/src/types";

export function useModalVisible<ExtraType = any>(
  nameToListen: ModalName
): [boolean, () => void, ExtraType | null] {
  const [visible, setVisible] = useState(false);
  const [extra, setExtra] = useState<ExtraType | null>(null);

  useEffect(() => {
    const listener = ModalOpener$.pipe(
      filter(({ name }) => name === nameToListen)
    ).subscribe(({ extra }) => {
      setExtra(extra);
      setVisible(true);
    });

    return () => listener.unsubscribe();
  }, []);

  function close() {
    setVisible(false);
  }

  return [visible, close, extra];
}
