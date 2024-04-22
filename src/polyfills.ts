(window as any).global = window;
global.Buffer = global.Buffer || require("buffer").Buffer;
(window as any).process = {
  env: { DEBUG: undefined },
  version: "", // to avoid undefined.slice error
};
