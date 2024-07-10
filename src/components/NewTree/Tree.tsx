import { ReactNode } from "react";

type TreeProps = {
  children: ReactNode;
};

export default function Tree({ children }: TreeProps) {
  return (
    <main>
      <h2 className="title-level2">NewTree</h2>
      {children}
    </main>
  );
}
