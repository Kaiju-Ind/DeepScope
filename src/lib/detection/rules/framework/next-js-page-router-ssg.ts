import type { TechnologyDefinition } from '../../types';

export const nextJsPageRouterSsgTechnologyDefinition = {
	id: "next-js-page-router-ssg",
	name: "Next.js Page Router SSG",
	website: "https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation",
	description: "Next.js Static Site Generation.",
	icon: "Next.js.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "next-js-page-router-ssg:jsGlobal:0",
			kind: "jsGlobal",
			property: ".__NEXT_DATA__.autoExport",
			valuePattern: new RegExp("true"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "next-js-page-router-ssg:jsGlobal:1",
			kind: "jsGlobal",
			property: ".__NEXT_DATA__.gsp",
			valuePattern: new RegExp("true"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "next-js-page-router-ssg:jsGlobal:2",
			kind: "jsGlobal",
			property: ".__NEXT_DATA__.nextExport",
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
