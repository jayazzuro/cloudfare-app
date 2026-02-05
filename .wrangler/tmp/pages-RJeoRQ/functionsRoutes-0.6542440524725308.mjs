import { onRequest as __api_users_js_onRequest } from "D:\\my-cloudflare-app\\functions\\api\\users.js"

export const routes = [
    {
      routePath: "/api/users",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_users_js_onRequest],
    },
  ]