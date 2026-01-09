import type {RuleHandler} from "../rule/types.d.js";
import {registerRule} from "../rule/index.js";

export type ValidatorPlugin = {
    rules?: Record<string, RuleHandler>
}

export function use(plugin: ValidatorPlugin) {
    if (plugin.rules) {
        for (const name in plugin.rules) {
            registerRule(name, plugin.rules[name])
        }
    }
}