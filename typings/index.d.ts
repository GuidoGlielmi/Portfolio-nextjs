export {};

declare global {
  type Ref = {
    ref: React.RefObject<HTMLDivElement>;
    title: string;
    href: string;
  };
}
