// O artifact carrega o React 18 (UMD) do cdnjs; os imports de 'react' apontam para o global.
/* eslint-disable @typescript-eslint/no-explicit-any */
const R = (window as any).React
export default R
export const {
  Children, Fragment, cloneElement, createContext, createElement, forwardRef, isValidElement, memo,
  useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useReducer, useRef, useState,
} = R
