import * as fs from 'fs';
import { transformWithEsbuild, Plugin, createFilter, FilterPattern } from 'vite';
import { transform as transformSvg } from '@svgr/core';
import { TPluginOptions } from './index.d';

const replacePropsFill = (code: string) =>
  code.replace(/(fill:\s*")((?!(none))[^"]*)"/g, (_, __, $3) => `fill: props.fill || "${$3}"`);


/**
 * 
 * @param {TPluginOptions} options
 * @param {FilterPattern} options.include default \*\*\/\*.svg
 * @returns 
 */
export function viteVueSvgComponentPlugin(options: TPluginOptions): Plugin {
  const _catch = new Map<string, string>();
  const { exportAsDefault, svgrOptions, esbuildOptions, include = '**/*.svg', exclude } = options;

  const filter = createFilter(include, exclude);

  return {
    name: 'vite:vue-svg-component',
    async transform(code: string, id: string) {

      if (filter(id)) {
        let returnCode = _catch.get(id);

        if (!returnCode) {
          const svgCode = await fs.promises.readFile(id.replace(/\?.*$/, ''), 'utf8');

          const componentCode = await transformSvg(
            svgCode,
            svgrOptions, {
            filePath: id,
            caller: {
              previousExport: exportAsDefault ? null : code
            }
          });

          const res = await transformWithEsbuild(componentCode, id, {
            loader: "jsx",
            ...esbuildOptions
          });

          returnCode = replacePropsFill(res.code.replace('as ReactComponent ', 'as Svg'));
          _catch.set(id, returnCode);
        }

        return {
          code: returnCode,
          map: null
        };
      }
    }
  };
}
