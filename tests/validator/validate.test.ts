import {describe, expect, it} from 'vitest'
import {createValidator, validate} from '@/index'

describe('validate()', () => {
    it('passes with valid data', () => {
        const data = {email: 'test@test.com'}

        const result = validate(data, {
            email: 'required|email',
        })

        expect(result).toEqual(data)
    })

    it('throws with invalid data', () => {
        expect(() =>
            validate(
                {email: ''},
                {email: 'required|email'},
                {'email.required': 'Email obrigatório'}
            )
        ).toThrow()
    })
})

describe('createValidator()', () => {
    it('stores errors after failure', () => {
        const validator = createValidator(
            {email: ''},
            {email: 'required'},
            {'email.required': 'Campo obrigatório'},
        )

        validator.validate()

        expect(validator.fails()).toBe(true)
        expect(validator.errors()).toEqual({
            email: ['Campo obrigatório'],
        })
    })
})