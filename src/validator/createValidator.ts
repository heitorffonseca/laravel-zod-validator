import {Messages, Rules, ValidationErrors} from "./types.d.js";
import {buildSchema} from '../schema/buildSchema.js'
import {formatErrors} from '../error/formatErrors.js'

export function createValidator(
    data: Record<string, any>,
    rules: Rules,
    messages: Messages = {}
) {
    let errors: ValidationErrors = {}

    return {
        validate(): boolean {
            const schema = buildSchema(rules, messages, data)
            const result = schema.safeParse(data)

            if (!result.success) {
                errors = formatErrors(result.error)

                return false
            }

            return true
        },
        fails() {
            return Object.keys(errors).length >= 1
        },
        errors() {
            return errors
        }
    }

}