import {describe, expect, it} from 'vitest'
import {createValidator, validate} from '@/index';

describe('rule: min', () => {
    it('fails when value is shorter than the minimum lengths', () => {
        const validator = createValidator(
            {password: '1234'},
            {password: 'min:8'},
            {'password.min': 'MIN_RULE'}
        )

        validator.validate()

        expect(validator.fails()).toBe(true)
        expect(validator.errors()).toEqual({
            password: ['MIN_RULE'],
        })
    })

    it('passes when value meets the minimum length requirement', () => {
        const data = {password: '12345678'}

        expect(() => {
            validate(data, {password: 'min:8'})
        }).not.toThrow()
    })
})