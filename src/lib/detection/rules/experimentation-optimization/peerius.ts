import type { TechnologyDefinition } from '../../types';

export const peeriusTechnologyDefinition = {
	id: "peerius",
	name: "Peerius",
	website: "https://www.peerius.com",
	description: "Peerius is a platform that analyzes individual visitor behavior on websites to optimize the checkout process.",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "peerius:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.peerius\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "peerius:jsGlobal:1",
			kind: "jsGlobal",
			property: "PeeriusCallbacks",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
