declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

export const root: string;
