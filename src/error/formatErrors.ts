import {ZodError} from 'zod'
import {ValidationErrors} from '../validator/types.d.js'

export function formatErrors(error: ZodError): ValidationErrors {
    const errors: ValidationErrors = {}

    for (const issue of error.issues) {
        const field = issue.path.join('.') || '_error'

        errors[field] ??= []
        errors[field].push(issue.message)
    }

    return errors
}