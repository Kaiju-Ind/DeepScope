import type { TechnologyDefinition } from '../../types';

export const nextJsAppRouterTechnologyDefinition = {
	id: "next-js-app-router",
	name: "Next.js App Router",
	website: "https://nextjs.org/docs/app",
	description: "The Next.js App Router is a new paradigm for building applications using React's latest features.",
	icon: "Next.js.svg",
	categories: [
		"framework",
		"ui-library",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "next-js-app-router:jsGlobal:0",
			kind: "jsGlobal",
			property: "next.appDir",
			valuePattern: new RegExp("true"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"next-js",
	],
	requires: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
