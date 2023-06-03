import { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import { KeyboardAlt as InfoIcon } from "@mui/icons-material";

const findNodes = (wrapperNode: HTMLElement): Element[] => {
  const nodes = wrapperNode.querySelectorAll(`[tabindex="0"]`);
  const array: Element[] = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].getAttribute("itemProp") === "ignore-arrows") {
      continue;
    }
    array.push(nodes[i]);
  }
  return array;
};

const config = {
  vertical: {
    forwards: "ArrowDown",
    backwards: "ArrowUp",
    description: "Press arrow up or arrow down to switch between options",
  },
  horizontal: {
    forwards: "ArrowRight",
    backwards: "ArrowLeft",
    description: "Press arrow left or arrow right to switch between options",
  },
};

export const WithFocusControls = (
  props: PropsWithChildren & {
    direction: "horizontal" | "vertical";
    customMessage?: string;
  }
) => {
  const wrapperNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onArrowsFocusNext = (event: KeyboardEvent) => {
      if (
        event.key !== config[props.direction].forwards &&
        event.key !== config[props.direction].backwards
      )
        return;

      let fallbackUsed = false;
      const focusFallback = (): boolean => {
        if (!wrapperNodeRef.current) return false;

        const nodes = findNodes(wrapperNodeRef.current);
        if (!nodes.length) {
          return false;
        }

        const node = nodes[0] as HTMLElement;
        if (typeof node?.focus === "function") {
          try {
            node.focus();
            return true;
          } catch (error) {
            console.log({ error });
          }
        }
        return false;
      };

      if (!wrapperNodeRef.current) return;
      if (!document.activeElement) fallbackUsed = focusFallback();

      if (!document.activeElement) return;
      if (!document.activeElement.hasAttribute("tabindex"))
        fallbackUsed = focusFallback();
      if (!document.activeElement.hasAttribute("tabindex")) return;

      if (!wrapperNodeRef.current.contains(document.activeElement))
        fallbackUsed = focusFallback();
      if (!wrapperNodeRef.current.contains(document.activeElement)) return;

      event.preventDefault();

      const nodeRefs = findNodes(wrapperNodeRef.current);
      const getCurrentIndex = () => {
        if (fallbackUsed) return -1;
        const currentIndex = nodeRefs.findIndex(
          (n) => n === document.activeElement
        );
        return currentIndex;
      };

      const currentIndex = getCurrentIndex();
      // focus next element
      let canditateIndex =
        event.key === config[props.direction].forwards
          ? currentIndex + 1
          : currentIndex - 1;
      if (canditateIndex >= nodeRefs.length) {
        canditateIndex = 0;
      } else if (canditateIndex < 0) {
        canditateIndex = nodeRefs.length - 1;
      }

      const node = nodeRefs[canditateIndex] as unknown as { focus: unknown };
      if (typeof node?.focus === "function") {
        try {
          node.focus();
        } catch (error) {
          console.log({ error });
        }
      }
    };
    const onEnter = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      if (!document.activeElement) return;
      if (!wrapperNodeRef.current) return;
      if (!document.activeElement.hasAttribute("tabindex")) return;

      event.preventDefault();

      const node = document.activeElement as HTMLElement;
      if (typeof node?.click === "function") {
        try {
          node.setAttribute("aria-hidden", "true"); // prevent additional screen reader
          node.click();
          return true;
        } catch (error) {
          console.log({ error });
        }
      }
    };
    document.addEventListener("keydown", onArrowsFocusNext);
    document.addEventListener("keydown", onEnter);
    return () => {
      document.removeEventListener("keydown", onArrowsFocusNext);
      document.removeEventListener("keydown", onEnter);
    };
  }, []);

  return (
    <div ref={wrapperNodeRef} aria-label={props.customMessage ?? config[props.direction].description}>
      <div
        className="flex flex-center-column"
        style={{ marginBottom: "25px" }}
        tabIndex={0}
        itemProp="ignore-arrows"
      >
        <span style={{ padding: "10px" }}>
          <InfoIcon aria-hidden="true" />
        </span>
        {props.customMessage ?? config[props.direction].description}
      </div>
      {props.children}
    </div>
  );
};
