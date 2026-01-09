import {registerRule} from './index.js'

import {required} from './rules/required.js';
import {email} from './rules/email.js';
import {min} from "./rules/min.js";
import {max} from "./rules/max.js";
import {nullable} from "./rules/nullable.js";
import {sometimes} from "./rules/sometimes.js";
import {requiredIf} from "./rules/requiredIf.js";

export function registerCoreRules() {
    registerRule('required', required)
    registerRule('email', email)
    registerRule('min', min)
    registerRule('max', max)
    registerRule('nullable', nullable)
    registerRule('sometimes', sometimes)
    registerRule('required_if', requiredIf)
}