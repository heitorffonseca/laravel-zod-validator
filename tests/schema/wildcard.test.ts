import {describe, expect, it} from 'vitest'
import {createValidator} from '@/index'

describe('schema: wildcard array validation', () => {
    it('fails when any array item violates the rule', () => {
        const validator = createValidator(
            {
                items: [
                    {name: 'Ok'},
                    {name: ''},
                ],
            },
            {
                'items.*.name': 'required|min:2',
            }
        )

        expect(validator.validate()).toBe(false)
        expect(Object.keys(validator.errors())).contains('items.1.name')
    })

    it('passes when all array items are valid', () => {
        const validator = createValidator(
            {
                items: [
                    {name: 'Item 1'},
                    {name: 'Item 2'},
                ],
            },
            {
                'items.*.name': 'required|min:3',
            }
        )

        expect(validator.validate()).toBe(true)
        expect(validator.errors()).toEqual({})
    })
})