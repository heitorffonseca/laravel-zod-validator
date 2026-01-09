import {z, ZodType} from 'zod'
import {Messages, Rules} from '../validator/types.d.js'
import {buildField} from './buildField.js'

export function buildSchema(
    rules: Rules,
    messages: Messages,
    data: Record<string, any>,
) {
    const shape: Record<string, ZodType> = {}

    for (const field in rules) {
        if (field.includes('.*.')) {
            const [arrayField, childField] = field.split('.*.')

            shape[arrayField] = z.array(
                z.object({
                    [childField]: buildField(
                        childField,
                        rules[field],
                        messages,
                        data[arrayField]?.[0] ?? {}
                    )
                })
            )

            continue
        }

        shape[field] = buildField(field, rules[field], messages, data)
    }

    return z.object(shape)
}