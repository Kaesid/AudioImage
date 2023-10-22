import { NavigateFunction } from "react-router-dom";

interface ISagaAction {
  type: string;
  navigate: NavigateFunction;
}

export type { ISagaAction };
