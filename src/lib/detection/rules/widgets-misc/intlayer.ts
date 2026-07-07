import type { TechnologyDefinition } from '../../types';

export const intlayerTechnologyDefinition = {
	id: "intlayer",
	name: "Intlayer",
	website: "https://intlayer.org",
	description: "Intlayer is an internationalization framework and content management platform for JavaScript applications.",
	icon: "Intlayer.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "intlayer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("IntlayerProvider-[\\w-]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intlayer:jsGlobal:1",
			kind: "jsGlobal",
			property: "intlayer.enabled",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
