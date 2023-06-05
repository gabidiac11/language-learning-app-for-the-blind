import { AppMessage } from "./accesibilityTypes"

export type PlayableMessage = {
    key: string,
    messages: AppMessage[];
}

export type PlayableError = {
    message: PlayableMessage,
    isAppPlayableError: true,
    originalError: unknown,
}