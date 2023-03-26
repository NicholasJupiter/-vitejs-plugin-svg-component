const removeSVGFill = (code: string) => {
  code = code.replace(/(fill:\s*['"])((?:.|\n)+?)["',]+/, '');
  return code;
};

const replaceSVGSize = (code: string) => {
  const widthReg = new RegExp(/(width:\s*['"]?)(((?:.|\n)+?)["',]{1})/);
  const heightReg = new RegExp(/(height:\s*['"]?)(((?:.|\n)+?)["',]{1})/);
  code = code.replace(widthReg, '$1 props.size || $2');
  code = code.replace(heightReg, '$1 props.size || $2');
  return code;
};

const replaceAllFill = (code: string) => {
  const reg = new RegExp(/(fill:\s*['"])((?:.|\n)+?)["']/g);
  code = code.replace(reg, (...args) => {
    return `fill: replaceFill('${args[2].toLowerCase()}')`;
  });
  return code;
};

const addPropsByFill = (code: string) => {
  const reg = new RegExp(/(fill:\s*['"])((?:.|\n)+?)[}]{1}/g);
  code = code.replace(reg, (...args) => {
    const [$0, $1, $2] = args;
    const color = $0.match(/(fill:\s*['"])((?:.|\n)+?)["']/)[2];
    const fnStr = `replacePropsByFill['${color}']`;
    return `${$1}${$2}, ${`...(typeof ${fnStr} === "object" ? ${fnStr} : {fill: replaceFill("${color}") })`} }`;
  });
  return code;
};

export const handleProps = (code: string) => {
  const handles = [
    removeSVGFill,
    replaceSVGSize,
    addPropsByFill
    // removeSVGFill,
  ];
  let restCode = code;
  for (const handle of handles) {
    restCode = handle(restCode);
  }
  return restCode;
};

export const svgrTemplate = (variables, { tpl }) => {
  const { imports, interfaces, componentName, props, jsx, exports } = variables;

  return tpl`

    import React,{ useCallback } from 'react';

    function ${componentName} (${props}) {
      const { replacePropsByFill = {}, fill } = props;

      const replaceFill = useCallback((color) => {
        const _replaceFill = replacePropsByFill[color]?.fill || replacePropsByFill[color];
        if (color === 'none') {
          return _replaceFill || color;
        }
        return _replaceFill || fill || color;
      },[replacePropsByFill, fill]);

      return ${jsx};
    }
    ${exports}
  `;
};
