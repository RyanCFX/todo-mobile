import React, {memo} from 'react';

/**
 * RENDERIZADO CONDICIONAL
 * @returns JSX.Element
 */
function RenderIf({condition, children}: {condition: boolean; children: any}) {
  return condition ? children : <></>;
}

export default memo(RenderIf);
