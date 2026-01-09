import {isEmpty} from '../../utils/isEmpty.js'
import {RuleHandler} from "../types.d.js";

export const requiredIf: RuleHandler = ({schema, param, data, field, messages}) => {
    if (!param) {
        return schema
    }

    const [otherField, expected] = param.split(',')

    const shouldRequire = data[otherField] !== undefined && String(data[otherField]) === expected

    if (shouldRequire && isEmpty(data[field])) {
        return schema.refine(() => false, {
            message:
                messages[`${field}.required_if`] ??
                `O campo ${field} é obrigatório`,
        })
    }

    return schema
}