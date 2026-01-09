import {describe, expect, it} from 'vitest';
import {createValidator, validate} from '@/index';

describe('rule: max', () => {
    it('fails when value exceeds the maximum length', () => {
        const validator = createValidator(
            {description: '0123456789'},
            {description: 'max:1'},
            {'description.max': 'MAX_RULE'}
        )

        validator.validate()

        expect(validator.fails()).toBe(true)
        expect(validator.errors()).toEqual({
            description: ['MAX_RULE'],
        })
    })

    it('passes when value is within the maximum length limit', () => {
        const data = {description: '0123456789'}

        expect(() => {
            validate(data, {description: 'max:20'})
        }).not.toThrow()
    })
})