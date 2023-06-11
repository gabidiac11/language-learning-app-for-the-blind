export type ApiMessage = {
    text: string;
    filePath: string|"not applicable";
    uniqueName: string;

    isDynamic?: boolean,
}

export const isApiMessage = (obj: unknown) => {
    if(!obj || typeof obj !== "object") {
        return false;
    }
    const objAsAppMessage = obj as ApiMessage;
    const result = objAsAppMessage.text && objAsAppMessage.filePath;
    return result;
}