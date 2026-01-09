import {z} from 'zod'
import type {RuleHandler} from '../types.d.js'

export const email: RuleHandler = ({field, messages}) => {
    return z.email(messages[`${field}.email`] ?? 'Email inválido')
}