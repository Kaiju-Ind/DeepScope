import type { TechnologyDefinition } from '../../types';

export const adasitecomplianceTechnologyDefinition = {
	id: "adasitecompliance",
	name: "AdaSiteCompliance",
	website: "https://adasitecompliance.com",
	description: "AdaSiteCompliance is a web accessibility solution, making websites compliant and accessible to WCAG 2.1 and section 508 compliance standards.",
	icon: "AdaSiteCompliance.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "adasitecompliance:jsGlobal:0",
			kind: "jsGlobal",
			property: "ADASTOOLBOXAPPSTATE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adasitecompliance:jsGlobal:1",
			kind: "jsGlobal",
			property: "adascHelper",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
