import React, { ComponentProps, ComponentType, ElementType } from "react";

import { Preloader } from "components";

type Props<T extends ElementType> = ComponentProps<T>;

export function WithSuspense<T extends ElementType>(Component: ComponentType<T>) {
  return (props: Props<T>) => {
    return (
      <React.Suspense fallback={<Preloader />}>
        <Component {...props} />
      </React.Suspense>
    );
  };
}
