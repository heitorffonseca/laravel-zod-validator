import type {RuleHandler} from '../types.d.js'

export const nullable: RuleHandler = ({schema}) => {
    return schema.optional().nullable()
}