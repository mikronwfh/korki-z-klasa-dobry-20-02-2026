import { useEffect } from "react";

export function useCtrlS(onSave: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        console.log("[useCtrlS] Ctrl+S detected - preventing default and calling onSave");
        event.preventDefault();
        onSave();
        return false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onSave]);
}
