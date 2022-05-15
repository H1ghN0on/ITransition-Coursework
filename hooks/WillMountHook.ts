import React from "react";

const useComponentWillMount = (cb: any) => {
  const willMount = React.useRef(true);

  if (willMount.current) cb();

  willMount.current = false;
};

export default useComponentWillMount;
