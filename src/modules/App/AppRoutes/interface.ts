interface IRoute {
  path: string;
  text?: string;
  Component: React.FunctionComponent | React.ComponentClass;
}

export type { IRoute };
