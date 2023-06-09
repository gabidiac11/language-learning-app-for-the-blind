export function getReadableTextFromHtmlElement(node: Element) {
  if (!node)
    return "";
  const htmlElement = node as HTMLElement;
  if (!("hasAttribute" in htmlElement))
    return "";
  if (htmlElement.getAttribute("aria-hidden") === "true")
    return "";

  if (htmlElement.hasAttribute("aria-label")) {
    const label = htmlElement.getAttribute("aria-label") ?? "";
    return `${label}`;
  }

  if (htmlElement.hasAttribute("alt")) {
    const label = htmlElement.getAttribute("alt") ?? "";
    return label;
  }

  if (["TEXTAREA", "INPUT"].includes(htmlElement.tagName)) {
    return `Input ${htmlElement.getAttribute("type") ?? "text"}. Value: ${htmlElement.getAttribute("value") ?? "empty"}`;
  }

  if (!htmlElement.children?.length && htmlElement.innerText) {
    const label = htmlElement.innerText;
    return `${label}`;
  }

  if (htmlElement.children?.length > 0) {
    let text = "";
    for (let i = 0; i < htmlElement.children.length; i++) {
      const textItem = getReadableTextFromHtmlElement(htmlElement.children[i]);
      if (textItem) {
        text += textItem;
      }
    }
    return text;
  }
  return "";
}
