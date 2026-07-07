import type { TechnologyDefinition } from '../../types';

export const jobBoardFireTechnologyDefinition = {
	id: "job-board-fire",
	name: "Job Board Fire",
	website: "https://www.jobboardfire.com",
	description: "JobBoardFire is a platform that provides software for managing job boards, connecting entrepreneurs and community members.",
	icon: "JobBoardFire.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "job-board-fire:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("jobboardfire\\.twic\\.pics"),
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
