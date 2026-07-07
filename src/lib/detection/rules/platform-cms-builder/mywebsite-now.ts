import type { TechnologyDefinition } from '../../types';

export const mywebsiteNowTechnologyDefinition = {
	id: "mywebsite-now",
	name: "MyWebsite Now",
	website: "https://www.ionos.com",
	description: "MyWebsite Now is a website builder designed for getting online quickly.",
	icon: "MyWebsite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mywebsite-now:dom:0",
			kind: "dom",
			selector: "img[src*='/-_-/res/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mywebsite-now:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("MyWebsite NOW", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mywebsite-now:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("mywebsite now", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"graphql",
		"node-js",
		"react",
	],
} as const satisfies TechnologyDefinition;
