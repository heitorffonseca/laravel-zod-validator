import type {ZodType} from 'zod'
import type {Messages} from '../validator/types.d.js'

export interface RuleHandlerContext {
    schema: ZodType
    field: string
    param?: string
    messages: Messages
    data: Record<string, any>

    bail(): void
}

export type RuleHandler = (context: RuleHandlerContext) => ZodType