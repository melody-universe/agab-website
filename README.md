# Assigned Gay at Band (AGAB) Website

## Stack

### Cloudflare for Hosting & Persistence

The site itself is served using [Cloudflare Workers](https://developers.cloudflare.com/workers/).
For deployment, we bundle our front-end app and bind to it as [Static Assets](https://developers.cloudflare.com/workers/static-assets/).

We also use [Cloudflare D1](https://developers.cloudflare.com/d1/) for persistence.

### [Hono](https://hono.dev) for Back End

Hono gives us a lightweight back-end server along with the following benefits:

- [Custom middleware](https://hono.dev/docs/guides/middleware#custom-middleware), which we use for…
  - Server-side rendering
  - Authorization
- [CSRF protection](https://hono.dev/docs/middleware/builtin/csrf)
