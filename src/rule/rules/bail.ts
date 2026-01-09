import {registerRule} from '../index.js'

registerRule('bail', ({schema, bail}) => {
    bail()
    return schema
})