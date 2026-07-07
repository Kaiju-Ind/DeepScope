import type { TechnologyDefinition } from '../../types';

export const smartLGovTechnologyDefinition = {
	id: "smart-l-gov",
	name: "SMART L-Gov",
	website: "https://www.smartvalue.ad.jp/business/smart_l-gov/",
	description: "SMART L-Gov is a platform and application that provides residents with information on daily government services and emergency alerts.",
	icon: "SMARTLGov.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smart-l-gov:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.smart-lgov\\.jp"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
