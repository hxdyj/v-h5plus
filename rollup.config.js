
import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';
export default [
    {
        external: ['vue-router'],
        input: 'src/index.ts',
        output: {
            file: 'es/index.js',
            format: 'esm'
        },

        plugins: [
            uglify(),
            typescript(),
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'typings/index.d.ts',
            format: 'esm'
        },

        plugins: [
            dts()
        ]
    },

]