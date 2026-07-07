import type { TechnologyDefinition } from '../../types';

export const getmorestudentsTechnologyDefinition = {
	id: "getmorestudents",
	name: "GetMoreStudents",
	website: "https://getmorestudents.net",
	description: "GetMoreStudents is a platform that supports dance studio owners in increasing class enrollment and boosting profits through marketing automation.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "getmorestudents:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.getmorestudents\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
