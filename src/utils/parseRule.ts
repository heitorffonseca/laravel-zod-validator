export function parseRule(rule: string): {
    name: string
    param?: string
} {
    const [name, param] = rule.split(':')
    return { name, param }
}