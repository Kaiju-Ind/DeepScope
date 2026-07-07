import type { TechnologyDefinition } from '../../types';

export const higherLogicTechnologyDefinition = {
	id: "higher-logic",
	name: "Higher Logic",
	website: "https://www.higherlogic.com",
	description: "Higher Logic is a digital marketing solution provider, formerly known as Informz.",
	icon: "Higher Logic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "higher-logic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.informz\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "higher-logic:jsGlobal:1",
			kind: "jsGlobal",
			property: "informz_trk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
