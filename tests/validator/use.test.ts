import {describe, expect, it} from 'vitest'
import {createValidator, use} from '@/index'

describe('validator.use()', () => {
    it('registers a custom rule via plugin', () => {
        use({
            rules: {
                upper: ({schema}) =>
                    schema.refine(
                        (value) => typeof value === 'string' && value === value.toUpperCase(),
                        {message: 'UPPERCASE_ONLY'}
                    ),
            },
        })

        const validator = createValidator(
            {name: 'abc'},
            {name: 'upper'}
        )

        expect(validator.validate()).toBe(false)
        expect(validator.errors()).toEqual({
            name: ['UPPERCASE_ONLY'],
        })
    })

    it('allows plugin rules to be combined with core rules', () => {
        use({
            rules: {
                starts_with_a: ({schema}) =>
                    schema.refine(
                        (value) => typeof value === 'string' && value.startsWith('A'),
                        {message: 'MUST_START_WITH_A'}
                    ),
            },
        })

        const validator = createValidator(
            {name: 'abc'},
            {name: 'required|starts_with_a'}
        )

        expect(validator.validate()).toBe(false)
        expect(validator.errors()).toEqual({
            name: ['MUST_START_WITH_A'],
        })
    })

    it('passes when custom rule condition is satisfied', () => {
        use({
            rules: {
                numeric_string: ({schema}) =>
                    schema.refine(
                        (value) => typeof value === 'string' && /^\d+$/.test(value),
                        {message: 'NUMERIC_ONLY'}
                    ),
            },
        })

        const validator = createValidator(
            {code: '12345'},
            {code: 'numeric_string'}
        )

        expect(validator.validate()).toBe(true)
        expect(validator.fails()).toBe(false)
        expect(validator.errors()).toEqual({})
    })
})
