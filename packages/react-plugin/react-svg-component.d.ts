declare module '*.svg' {
  import { FunctionComponent } from 'react';

  type TPropsByFillValue = {
    fill: string;
    fillOpacity: string | number;
  };
  
  type TSvgComponentProps = {
    className?: any;
    fill?: string;
    replacePropsByFill?: {
      [key: string]: string | Partial<TPropsByFillValue>;
    };
    size?: string;
    width?: string;
    height?: string;
  };

  type TReactSvgComponent = {
    uri: string;
    svgCode: string;
  } & FunctionComponent<TSvgComponentProps>;

  const content: TReactSvgComponent;
  export default content;

  export const uri: string;
  export const svgCode: string;
}
