import type { TechnologyDefinition } from "../../types.ts";
import { pageJsTechnologyDefinition } from "./page-js.ts";
import { tanstackTechnologyDefinition } from "./tanstack.ts";
import { umijsTechnologyDefinition } from "./umijs.ts";
import { angularRouterTechnologyDefinition } from "./angular-router.ts";
import { emberRouterTechnologyDefinition } from "./ember-router.ts";
import { nextJsRouterTechnologyDefinition } from "./next-js-router.ts";
import { qwikRouterTechnologyDefinition } from "./qwik-router.ts";
import { reactRouterTechnologyDefinition } from "./react-router.ts";
import { remixRouterTechnologyDefinition } from "./remix-router.ts";
import { solidRouterTechnologyDefinition } from "./solid-router.ts";
import { svelteRouterTechnologyDefinition } from "./svelte-router.ts";
import { tanstackRouterTechnologyDefinition } from "./tanstack-router.ts";
import { vitepressRouterTechnologyDefinition } from "./vitepress-router.ts";
import { vueRouterTechnologyDefinition } from "./vue-router.ts";
import { vuepressRouterTechnologyDefinition } from "./vuepress-router.ts";

export const routerTechnologyDefinitions = [
	pageJsTechnologyDefinition,
	tanstackTechnologyDefinition,
	umijsTechnologyDefinition,
	angularRouterTechnologyDefinition,
	emberRouterTechnologyDefinition,
	nextJsRouterTechnologyDefinition,
	qwikRouterTechnologyDefinition,
	reactRouterTechnologyDefinition,
	remixRouterTechnologyDefinition,
	solidRouterTechnologyDefinition,
	svelteRouterTechnologyDefinition,
	tanstackRouterTechnologyDefinition,
	vitepressRouterTechnologyDefinition,
	vueRouterTechnologyDefinition,
	vuepressRouterTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
