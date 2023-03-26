import type { FilterPattern, TransformOptions } from 'vite';
import type { Config } from '@svgr/core';
import { FunctionComponent } from 'react';

export type TPluginOptions = {
  exportAsDefault?: boolean;
  svgrOptions?: Config;
  esbuildOptions?: TransformOptions;
  include?: FilterPattern;
  exclude?: FilterPattern;
};
