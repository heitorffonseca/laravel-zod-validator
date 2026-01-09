import {applyRules} from './applyRules.js'
import {Messages} from '../validator/types.d.js'

export const buildField = (
    field: string,
    ruleString: string,
    messages: Messages,
    data: Record<string, any>,
) => applyRules(field, ruleString, messages, data)
