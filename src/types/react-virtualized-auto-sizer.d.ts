declare module "react-virtualized-auto-sizer" {
  import type { ReactNode } from "react";

  type Props = {
    children: (size: { width: number; height: number }) => ReactNode;
    defaultHeight?: number;
    defaultWidth?: number;
    disableHeight?: boolean;
    disableWidth?: boolean;
  };

  export default function AutoSizer(props: Props): JSX.Element;
}
