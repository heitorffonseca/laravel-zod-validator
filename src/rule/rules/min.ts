import {z} from 'zod'
import type {RuleHandler} from "../types.d.js"

export const min: RuleHandler = ({param, field, messages}) => {
    const value = Number(param)

    return z.string().min(value, messages[`${field}.min`] ?? `Mínimo ${value} caracteres`)
}