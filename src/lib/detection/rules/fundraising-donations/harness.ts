import type { TechnologyDefinition } from '../../types';

export const harnessTechnologyDefinition = {
	id: "harness",
	name: "Harness",
	website: "https://www.goharness.com/nonprofits",
	description: "Harness is a fundraising solution designed to streamline the process of raising funds for various causes and initiatives.",
	icon: "Harness.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "harness:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.harnessapp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "harness:jsGlobal:1",
			kind: "jsGlobal",
			property: "HarnessWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
