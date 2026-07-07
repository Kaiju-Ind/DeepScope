import type { TechnologyDefinition } from '../../types';

export const nextJsPageRouterSsrTechnologyDefinition = {
	id: "next-js-page-router-ssr",
	name: "Next.js Page Router SSR",
	website: "https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering",
	description: "Next.js Server-Side Rendering.",
	icon: "Next.js.svg",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "next-js-page-router-ssr:jsGlobal:0",
			kind: "jsGlobal",
			property: ".__NEXT_DATA__.gip",
			valuePattern: new RegExp("true"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "next-js-page-router-ssr:jsGlobal:1",
			kind: "jsGlobal",
			property: ".__NEXT_DATA__.gssp",
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
