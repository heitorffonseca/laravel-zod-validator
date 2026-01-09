export class ValidationException extends Error {
    constructor(public errors: Record<string, string[]>) {
        super('Validation failed')
    }
}