import {parseRule} from './parseRule.js'

export function parseRules(ruleString: string) {
    return ruleString
        .split('|')
        .map(r => r.trim())
        .filter(Boolean)
        .map(parseRule)
}