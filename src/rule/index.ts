import type {RuleHandler} from './types.d.js'

const registry = new Map<string, RuleHandler>()

export const registerRule = (name: string, handler: RuleHandler) => registry.set(name, handler)

export const getRule = (name: string) => registry.get(name)
