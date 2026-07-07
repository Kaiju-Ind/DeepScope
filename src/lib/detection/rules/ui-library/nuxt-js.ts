import type { TechnologyDefinition } from '../../types';

export const nuxtJsTechnologyDefinition = {
	id: "nuxt-js",
	name: "Nuxt.js",
	website: "https://nuxtjs.org",
	description: "Nuxt.js is a Vue framework for server-rendered, statically generated, and full-stack web applications.",
	icon: "Nuxt.js.svg",
	categories: [
		"ui-library",
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "nuxt-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_nuxt\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nuxt-js:html:1",
			kind: "html",
			pattern: new RegExp("<div [^>]*id=\"__nuxt\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nuxt-js:html:2",
			kind: "html",
			pattern: new RegExp("<script [^>]*>window\\.__NUXT__"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nuxt-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "$nuxt",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nuxt-js:dom:4",
			kind: "dom",
			selector: "div[id^='__nuxt']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nuxt-js:jsGlobal:5",
			kind: "jsGlobal",
			property: "__NUXT__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nuxt-js:jsGlobal:6",
			kind: "jsGlobal",
			property: "useNuxtApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nuxt-js:html:7",
			kind: "html",
			pattern: new RegExp("<script [^>]*>window\\.__nuxt__"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:nuxt:nuxt:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
