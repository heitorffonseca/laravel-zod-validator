import {describe, expect, it} from 'vitest'
import {createValidator} from '@/index'

describe('rule: required_if', () => {
    it('fails when condition matches and field is missing', () => {
        const validator = createValidator(
            {type: 'admin'},
            {name: 'required_if:type,admin'}
        )

        expect(validator.validate()).toBe(false)
        expect(validator.errors()).toEqual({
            name: ['O campo name é obrigatório'],
        })
    })

    it('passes when condition does not match', () => {
        const validator = createValidator(
            {type: 'user'},
            {name: 'required_if:type,admin'}
        )

        expect(validator.validate()).toBe(true)
    })

    it('passes when condition matches and field is present', () => {
        const validator = createValidator(
            {type: 'admin', name: 'Heitor'},
            {name: 'required_if:type,admin'}
        )

        expect(validator.validate()).toBe(true)
    })

    it('uses custom message when provided', () => {
        const validator = createValidator(
            {type: 'admin'},
            {name: 'required_if:type,admin'},
            {'name.required_if': 'NAME_REQUIRED'}
        )

        expect(validator.validate()).toBe(false)
        expect(validator.errors()).toEqual({
            name: ['NAME_REQUIRED'],
        })
    })
})