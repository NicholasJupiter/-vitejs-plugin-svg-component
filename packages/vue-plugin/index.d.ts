import type { FilterPattern } from "vite";
import type { Config  } from '@svgr/core';
import type { TransformOptions } from 'vite';


export type TPluginOptions = {
  exportAsDefault?: boolean;
  svgrOptions?: Config;
  esbuildOptions?: TransformOptions;
  include?: FilterPattern;
  exclude?: FilterPattern;
}