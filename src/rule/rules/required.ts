import {z} from 'zod'
import type {RuleHandler} from '../types.d.js'

export const required: RuleHandler = ({field, messages}) => {
    return z.any().refine(
        (value) => value !== undefined && value !== null && value !== '',
        messages[`${field}.required`] ?? 'Campo obrigatório'
    )
}