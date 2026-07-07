import type { TechnologyDefinition } from '../../types';

export const funnelsOfCourseTechnologyDefinition = {
	id: "funnels-of-course",
	name: "Funnels of Course",
	website: "https://funnelsofcourse.com",
	description: "Funnels of Course is an all-in-one marketing platform designed to support coaches and course creators in achieving online success.",
	icon: "FunnelsOfCourse.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "funnels-of-course:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.funnelsofcourse\\.com"),
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
