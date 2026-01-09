import {z, ZodType} from 'zod'
import {getRule} from '../rule/index.js'
import {Messages} from '../validator/types.d.js'
import {parseRules} from '../utils/parseRules.js'
import {isEmpty} from "../utils/isEmpty.js";

export function applyRules(
    field: string,
    ruleString: string,
    messages: Messages,
    data: Record<string, any>
) {
    let schema: ZodType = z.any()
    let bail = false

    for (const {name, param} of parseRules(ruleString)) {
        if (isEmpty(data[field]) && name !== 'required' && name !== 'required_if') {
            continue
        }

        const handler = getRule(name)
        if (!handler) {
            continue
        }

        schema = handler({
            schema,
            field,
            param,
            messages,
            data,
            bail: () => (bail = true),
        })

        if (bail) {
            break
        }
    }

    return schema
}