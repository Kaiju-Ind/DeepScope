import type { TechnologyDefinition } from '../../types';

export const missionsuiteTechnologyDefinition = {
	id: "missionsuite",
	name: "MissionSuite",
	website: "https://www.themissionsuite.com",
	description: "Mission Suite is an all-in-one marketing software solution which combines CRM, email marketing, marketing automation, and inbound marketing tools.",
	icon: "MissionSuite.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "missionsuite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.themissionsuite\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "missionsuite:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.themissionsuite\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
