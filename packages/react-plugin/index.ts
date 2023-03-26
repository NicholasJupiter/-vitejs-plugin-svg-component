import { FunctionComponent } from 'react';


export type TSvgComponentProps = {
  fill?: string;
  replaceFill?: { [key: string]: string };
  size?: string;
  width?: string;
  height?: string;
};

export type TReactSvgComponent = {
  uri: string;
  svgCode: string;
} & FunctionComponent<TSvgComponentProps>;


export * from './plugin';