import { Context, MiddlewareHandler } from "hono";
import type { ComponentChild } from "preact";

export type Route<TLoaderData> =
  | RouteWithLoader<TLoaderData>
  | RouteWithoutLoader;

export type RouteWithLoader<TLoaderData> = {
  loader(context: Context<{ Bindings: Env }>): Promise<TLoaderData>;
  Page(props: { data: TLoaderData | NoPreloadedData }): ComponentChild;
} & BaseRoute;
type RouteWithoutLoader = {
  loader?: never;
  Page(): ComponentChild;
} & BaseRoute;
type BaseRoute = {
  middleware?: MiddlewareHandler<{ Bindings: Env }>;
  path: string;
};

export type InitialData<TRoute extends RouteWithLoader<unknown>> =
  | {
      path: string;
      data: LoaderData<TRoute>;
    }
  | NoPreloadedData;

export type LoaderData<TRoute extends RouteWithLoader<unknown>> =
  TRoute extends RouteWithLoader<infer ILoaderData> ? ILoaderData : never;

export const noPreloadedData: unique symbol = Symbol("no preloaded data");
export type NoPreloadedData = typeof noPreloadedData;
