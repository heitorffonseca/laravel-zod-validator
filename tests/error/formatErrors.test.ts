import {describe, expect, it} from 'vitest'
import {z, ZodError} from 'zod'
import {formatErrors} from '@/error/formatErrors'

describe('formatErrors()', () => {
    it('formats errors by field', () => {
        try {
            z.object({email: z.email({error: 'INVALID_EMAIL'})}).parse({email: 'invalid'})
        } catch (e) {
            const errors = formatErrors(e as ZodError)

            expect(errors).toEqual({
                email: ['INVALID_EMAIL'],
            })
        }
    })
})