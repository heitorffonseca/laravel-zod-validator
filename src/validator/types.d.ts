export type Rules = Record<string, string>
export type Messages = Record<string, string>

export type ValidationErrors = {
    [field: string]: string[]
}
export type ValidatorContext = {
    data: Record<string, any>,
    messages: Messages
}