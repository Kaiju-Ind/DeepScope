import type { TechnologyDefinition } from '../../types';

export const optibaseTechnologyDefinition = {
	id: "optibase",
	name: "Optibase",
	website: "https://www.optibase.io",
	description: "Optibase is an A/B testing app for Webflow, enabling data-driven decisions by testing various elements such as copy, design, or entire pages, aimed at improving site conversions.",
	icon: "Optibase.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "optibase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.optibase\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optibase:jsGlobal:1",
			kind: "jsGlobal",
			property: "optibaseScriptLoaded",
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
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;
