import {describe, expect, it} from 'vitest'
import {validate} from '@/index'

describe('rule: required', () => {
    it('fails when empty', () => {
        expect(() =>
            validate({name: ''}, {name: 'required'})
        ).toThrow()
    })

    it('passes when filled', () => {
        const data = {name: 'Heitor'}

        expect(() =>
            validate(data, {name: 'required'})
        ).not.toThrow()
    })
})