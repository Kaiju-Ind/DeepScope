import type { TechnologyDefinition } from '../../types';

export const sizemeTechnologyDefinition = {
	id: "sizeme",
	name: "SizeMe",
	website: "https://www.sizemeai.com",
	description: "SizeMe is a platform that helps customers consistently find the correct size and fit for products.",
	icon: "SizeMe.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "sizeme:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.api\\.sizemeai\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sizeme:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\api\\.sizemeai\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
