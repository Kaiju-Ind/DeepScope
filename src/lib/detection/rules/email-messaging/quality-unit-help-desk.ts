import type { TechnologyDefinition } from '../../types';

export const qualityUnitHelpDeskTechnologyDefinition = {
	id: "quality-unit-help-desk",
	name: "Quality Unit Help Desk",
	website: "https://www.qualityunit.com",
	description: "Quality Unit Help Desk is a customer support and help desk software designed to manage and streamline customer service operations.",
	icon: "QualityUnitHelpDesk.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "quality-unit-help-desk:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.qualityunit\\.liveagent"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
