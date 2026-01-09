import {z} from 'zod'
import type {RuleHandler} from "../types.d.js"

export const max: RuleHandler = ({schema, param, field, messages}) => {
    const value = Number(param)

    const message =
        messages[`${field}.max`] ?? `Máximo ${value} caracteres`

    const base =
        schema instanceof z.ZodString ? schema : z.string()

    return base.max(value, message)
}