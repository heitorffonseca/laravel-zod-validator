import {z} from 'zod'
import type {RuleHandler} from '../types.d.js'

export const sometimes: RuleHandler = ({field, data, bail}) => {
    if (!(field in data)) {
        bail()
        return z.any().optional()
    }

    return z.any()
}