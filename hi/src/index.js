
import UU5 from "uu5g04";

import Spa from "spa";

// propagate app version into environment
UU5.Environment["appVersion"] = process.env.VERSION;

// consider app as progressive web app, but not on iOS (OIDC login doesn't work there)
if (!navigator.userAgent.match(/iPhone|iPad|iPod/)) {
  let link = document.createElement("link");
  link.rel = "manifest";
  link.href = "assets/manifest.json";
  document.head.appendChild(link);
}

// store the target element selector to use it again during hot update
let _targetElementId;

export function render(targetElementId) {
  _targetElementId = targetElementId;

  UU5.Common.DOM.render(
  
      <Spa />,
    document.getElementById(targetElementId)
  );
}

if (module.hot) {
  module.hot.accept("./core/spa", () => {
    if (_targetElementId) render(_targetElementId);
  });
}

if (process.env.NODE_ENV !== "development") {
  console.log(
    `${process.env.NAME}-${process.env.VERSION} © Unicorn\nTerms of Use: https://unicorn.com/tou/${process.env.NAME}`
  );
}
UU5.Environment.addRuntimeLibrary({
  name: process.env.NAME,
  version: process.env.VERSION,
  namespace: process.env.NAMESPACE,
});