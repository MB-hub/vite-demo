import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
// import autoImportConfigs from './.eslintrc-auto-import.json' assert { type: 'json' };
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const autoImportConfigs = require('./.eslintrc-auto-import.json');
export default defineConfig([
    // 1. 忽略規則
    {
        ignores: ['**/node_modules/', '**/dist/', '**/public/', 'pnpm-lock.yaml', '**/*.json', '**/.husky/']
    },

    // 2. 基礎配置
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        languageOptions: {
            globals: { ...globals.browser, ...(autoImportConfigs.globals || autoImportConfigs) }
        } // ✨ 關鍵：將 ref, reactive 等變量注入 ESLint
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],

    // 3. 針對 Vue 文件的解析配置
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        }
    },

    // 4. ✨ 新增自定義規則：關閉報錯
    {
        rules: {
           'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-useless-assignment': 'off',

        // 1. ✨ 允许以下划线开头的变量不被使用 (解决 _to, _from 警告)
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { 
                argsIgnorePattern: '^_', 
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true 
            }
        ],

        // 2. ✨ 关闭 no-undef 检查
        // 理由：TypeScript 已经有更强大的类型检查，ESLint 的 no-undef 在自动引入模式下极易误报
        'no-undef': 'off' 
        }
    }
]);
