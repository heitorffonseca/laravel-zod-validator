import {Messages, Rules} from './types.d.js'
import {createValidator} from './createValidator.js'
import {ValidationException} from '../error/ValidationException.js'

export function validate(
    data: Record<string, any>,
    rules: Rules,
    messages: Messages = {},
) {
    const validator = createValidator(data, rules, messages)

    if (!validator.validate()) {
        throw new ValidationException(validator.errors())
    }

    return data
}