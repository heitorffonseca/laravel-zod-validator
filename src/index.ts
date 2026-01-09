import {registerCoreRules} from "./rule/register.js";

registerCoreRules()

export {validate} from './validator/validate.js'
export {createValidator} from './validator/createValidator.js'
export {use} from './validator/use.js'

export type {
    Rules,
    Messages,
    ValidationErrors,
} from './validator/types.d.js'