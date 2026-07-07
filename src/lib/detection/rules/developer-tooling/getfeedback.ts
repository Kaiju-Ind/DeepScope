import type { TechnologyDefinition } from '../../types';

export const getfeedbackTechnologyDefinition = {
	id: "getfeedback",
	name: "GetFeedback",
	website: "https://www.getfeedback.com",
	description: "GetFeedback (formerly Usabilla) is a user feedback solution for collecting qualitative and quantitative user feedback across digital channels including websites, apps and emails.",
	icon: "GetFeedback.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "getfeedback:jsGlobal:0",
			kind: "jsGlobal",
			property: "usabilla_live",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
