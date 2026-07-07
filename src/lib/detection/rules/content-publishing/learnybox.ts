import type { TechnologyDefinition } from '../../types';

export const learnyboxTechnologyDefinition = {
	id: "learnybox",
	name: "LearnyBox",
	website: "https://learnybox.com",
	description: "LearnyBox is an all-in-one platform that enables users to launch, manage, and sell training courses.",
	icon: "LearnyBox.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "learnybox:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("learnybox\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "learnybox:jsGlobal:1",
			kind: "jsGlobal",
			property: "ExecuteActionLearnyMail",
			description: "Page-owned global matches a known technology marker.",
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
