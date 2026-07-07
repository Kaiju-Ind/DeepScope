import type { TechnologyDefinition } from '../../types';

export const ampryTechnologyDefinition = {
	id: "ampry",
	name: "Ampry",
	website: "https://www.ampry.com",
	description: "Ampry is a client acquisition marketing service designed to support law firms in expanding their reach and acquiring new clients.",
	icon: "Ampry.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ampry:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ampry\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ampry:jsGlobal:1",
			kind: "jsGlobal",
			property: "ampry_acc_code",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ampry:jsGlobal:2",
			kind: "jsGlobal",
			property: "ampry_script",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
