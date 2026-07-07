import type { TechnologyDefinition } from '../../types';

export const qonnexTechnologyDefinition = {
	id: "qonnex",
	name: "Qonnex",
	website: "https://www.qonnex.nl",
	description: "Qonnex is a software designed to enhance customer relations and manage stock for businesses.",
	icon: "Qonnex.svg",
	categories: [
		"platform-cms-builder",
		"business-tools",
	],
	rules: [
		{
			id: "qonnex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qonnex\\.nl\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qonnex:jsGlobal:1",
			kind: "jsGlobal",
			property: "QonnexQS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qonnex:jsGlobal:2",
			kind: "jsGlobal",
			property: "QonnexQSloader",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
