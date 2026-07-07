import type { TechnologyDefinition } from '../../types';

export const helloBarTechnologyDefinition = {
	id: "hello-bar",
	name: "Hello Bar",
	website: "https://hellobar.com",
	description: "Hello Bar is a customizable notification bar that draws visitors to an important call to action on the website.",
	icon: "Hello Bar.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "hello-bar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.?hellobar\\.(?:com|js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hello-bar:jsGlobal:1",
			kind: "jsGlobal",
			property: "HelloBar",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hello-bar:jsGlobal:2",
			kind: "jsGlobal",
			property: "hellobarSiteSettings",
			description: "Page-owned global matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
