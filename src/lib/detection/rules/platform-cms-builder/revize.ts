import type { TechnologyDefinition } from '../../types';

export const revizeTechnologyDefinition = {
	id: "revize",
	name: "Revize",
	website: "https://www.revize.com",
	description: "Revize is a platform designed to create and manage websites for government agencies.",
	icon: "Revize.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "revize:jsGlobal:0",
			kind: "jsGlobal",
			property: "RZ.MSIE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "revize:jsGlobal:1",
			kind: "jsGlobal",
			property: "RZabsoluteUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
