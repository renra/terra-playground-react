import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Playground from './components/Playground';

declare global {
    interface Window {
      TerraPlayground: (outletId: string) => void;
    }
}

const init = (outletId : string) : void => {
  ReactDOM.render(
    <Playground />,
    document.getElementById(outletId)
  );
}

window.TerraPlayground = init;
