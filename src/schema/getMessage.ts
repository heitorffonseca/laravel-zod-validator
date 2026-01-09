import {Messages} from '../validator/types.d.js'

export function getMessage(
    messages: Messages,
    field: string,
    rule: string,
    fallback: string
) {
    return (
        messages[`${field}.${rule}`] ??
        messages[rule] ??
        fallback
    )
}