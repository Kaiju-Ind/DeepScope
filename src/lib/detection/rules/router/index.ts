import type { TechnologyDefinition } from '../../types';
import { pageJsTechnologyDefinition } from './page-js';
import { tanstackTechnologyDefinition } from './tanstack';
import { umijsTechnologyDefinition } from './umijs';
import { angularRouterTechnologyDefinition } from './angular-router';
import { emberRouterTechnologyDefinition } from './ember-router';
import { nextJsRouterTechnologyDefinition } from './next-js-router';
import { qwikRouterTechnologyDefinition } from './qwik-router';
import { reactRouterTechnologyDefinition } from './react-router';
import { remixRouterTechnologyDefinition } from './remix-router';
import { solidRouterTechnologyDefinition } from './solid-router';
import { svelteRouterTechnologyDefinition } from './svelte-router';
import { tanstackRouterTechnologyDefinition } from './tanstack-router';
import { vitepressRouterTechnologyDefinition } from './vitepress-router';
import { vueRouterTechnologyDefinition } from './vue-router';
import { vuepressRouterTechnologyDefinition } from './vuepress-router';

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
