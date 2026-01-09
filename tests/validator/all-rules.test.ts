import {describe, expect, it} from 'vitest'
import {createValidator} from '@/index'

describe('validator – all rules integration', () => {
    it('fails with all applicable validation errors', () => {
        const validator = createValidator(
            {
                name: '',
                email: 'invalid-email',
                bio: null,
                password: '12',
                age: undefined,
            },
            {
                name: 'required|min:3',
                email: 'required|email',
                bio: 'nullable|min:10',
                password: 'required|min:6|max:10',
                age: 'sometimes',
            },
            {
                'name.required': 'NAME_REQUIRED',
                'email.email': 'EMAIL_INVALID',
                'password.min': 'PASSWORD_TOO_SHORT',
            }
        )

        expect(validator.validate()).toBe(false)
        expect(validator.fails()).toBe(true)
        expect(validator.errors()).toEqual({
            name: ['NAME_REQUIRED'],
            email: ['EMAIL_INVALID'],
            password: ['PASSWORD_TOO_SHORT'],
        })
    })

    it('passes when all rules are satisfied', () => {
        const validator = createValidator(
            {
                name: 'Heitor',
                email: 'heitor@email.com',
                bio: null,
                password: '123456',
            },
            {
                name: 'required|min:3',
                email: 'required|email',
                bio: 'nullable|min:10',
                password: 'required|min:6|max:10',
                age: 'sometimes',
            }
        )

        expect(validator.validate()).toBe(true)
        expect(validator.fails()).toBe(false)
        expect(validator.errors()).toEqual({})
    })
})