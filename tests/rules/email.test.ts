import {describe, expect, it} from 'vitest'
import {validate} from '@/index'

describe('rule: email', () => {
    it('fails with invalid email', () => {
        expect(() =>
            validate({email: 'abc'}, {email: 'email'})
        ).toThrow()
    })
})