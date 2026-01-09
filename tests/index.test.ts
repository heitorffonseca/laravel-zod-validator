import {describe, expect, it} from 'vitest'
import * as pkg from '@/index'

describe('package exports', () => {
    it('exports validate()', () => {
        expect(pkg.validate).toBeTypeOf('function')
    })

    it('exports createValidator()', () => {
        expect(pkg.createValidator).toBeTypeOf('function')
    })
})