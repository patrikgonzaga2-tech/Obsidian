// jsx-runtime "automático" em cima do React 18 UMD: createElement já preserva props.children.
/* eslint-disable @typescript-eslint/no-explicit-any */
const R = (window as any).React
export const Fragment = R.Fragment
export const jsx = (tipo: any, props: any, key?: any) => R.createElement(tipo, key === undefined ? props : { ...props, key })
export const jsxs = jsx
