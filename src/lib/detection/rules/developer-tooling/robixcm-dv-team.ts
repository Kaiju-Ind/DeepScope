import type { TechnologyDefinition } from '../../types';

export const robixcmDvTeamTechnologyDefinition = {
	id: "robixcm-dv-team",
	name: "RobixCM DV Team",
	website: "https://robixcm.ir",
	description: "RobixCM DV Team is a provider of web design and management services, offering solutions for website creation, maintenance, and optimization.",
	icon: "Robixcm.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "robixcm-dv-team:meta:0",
			kind: "meta",
			key: "robixcmteam",
			valuePattern: new RegExp("RobixCM", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "robixcm-dv-team:meta:1",
			kind: "meta",
			key: "robixcmteam",
			valuePattern: new RegExp("robixcm", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
