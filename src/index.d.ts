export type ValidationRules = Record<string, string>

export type ValidationMessages = {
    [key: string]: string
}

export type ValidationErrors = {
    [field: string]: string[]
}

export interface Validator {
    validate<T extends Record<string, any>>(
        data: T,
        rules: ValidationRules,
        messages?: ValidationMessages
    ): T

    errors(): ValidationErrors

    passes(): boolean

    fails(): boolean
}

export function createValidator(): Validator

export function validate<T extends Record<string, any>>(
    data: T,
    rules: ValidationRules,
    messages?: ValidationMessages
): T