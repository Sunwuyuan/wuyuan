/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

interface Window {
  twttr?: {
    widgets: {
      load: (el?: HTMLElement) => void;
      createTimeline: (
        widgetId: { sourceType: string; screenName: string },
        targetEl: HTMLElement,
        options?: Record<string, unknown>,
      ) => Promise<HTMLElement>;
    };
    _e?: Array<() => void>;
  };
}
