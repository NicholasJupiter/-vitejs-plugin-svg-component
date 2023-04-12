import * as fs from 'fs';
import { TPluginOptions } from "./types";
import { Plugin, createFilter, FilterPattern } from 'vite';
import type * as types from './types';
import { compilerSvg } from './utils/compiler';
import { handleProps } from './utils/template';

/**
 *
 * @param {TPluginOptions} options
 * @param {FilterPattern} options.include default \*\*\/\*.svg*
 * @param {boolean} options.exportAsDefault default true
 * @returns
 */
export function viteReactSvgComponentPlugin(options: TPluginOptions): Plugin {
  const _catch = new Map<string, string>();
  const { include = '**/*.svg*', exclude } = options;

  const filter = createFilter(include, exclude);

  return {
    name: 'vite:react-svg-component',
    async transform(_code: string, uri: string) {
      if (filter(uri)) {
        let returnCode = _catch.get(uri);
        
        if (!returnCode) {
          const svgCode = await fs.promises.readFile(uri.replace(/\?.*$/, ''), 'utf8');
          const reactJsxCode = await compilerSvg(uri, svgCode, options);
          returnCode = handleProps(reactJsxCode.code);
          returnCode += `
            export const svgCode = \`${svgCode}\`;
            export const uri = \`${_code.replace(/.*["'](.*)['"]/,'$1')}\`;
          `
          _catch.set(uri, returnCode);
        }

        return {
          code: returnCode,
          map: null
        };
      }
    }
  };
}