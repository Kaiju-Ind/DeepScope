import type { TechnologyDefinition } from '../../types';

export const studioTechnologyDefinition = {
	id: "studio",
	name: "STUDIO",
	website: "https://studio.design",
	description: "STUDIO is a Japan-based company and SaaS application for designing and hosting websites. The service includes a visual editor with built-in CMS and analytics.",
	icon: "STUDIO.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "studio:dom:0",
			kind: "dom",
			selector: ".StudioCanvas, .publish-studio-style",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "studio:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^STUDIO$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "studio:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^studio$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"firebase",
		"google-cloud",
		"google-tag-manager",
		"nuxt-js",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
