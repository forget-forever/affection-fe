import { rootBase } from "./proxy";

export const env = {
  NODE_ENV: '"development"'
};
export const defineConstants = {};
export const mini = {};
export const h5 = {
  devServer: {
    host: '0.0.0.0',
    port: 10086,
    proxy: {
      '/': {
        target: rootBase, // 服务端地址
        changeOrigin: true,
      },
    },
  },
};
