import { transformWithEsbuild } from 'vite';
import { transform as transformSvg } from '@svgr/core';
import { TPluginOptions } from '../types';
import { svgrTemplate } from './template';

export const compilerSvg = async (uri: string, svgCode: string, options: TPluginOptions) => {
  const {
    svgrOptions = {
      template: svgrTemplate,
      exportType: 'default'
    },
    esbuildOptions
  } = options;

  const componentCode = await transformSvg(svgCode, svgrOptions, {
    filePath: uri,
    caller: {
      previousExport: null
    }
  });
  const reactJsxCode = await transformWithEsbuild(componentCode, uri, {
    loader: 'jsx',
    ...esbuildOptions
  });
  return reactJsxCode;
};
