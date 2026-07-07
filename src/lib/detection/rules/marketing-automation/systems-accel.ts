import type { TechnologyDefinition } from '../../types';

export const systemsAccelTechnologyDefinition = {
	id: "systems-accel",
	name: "Systems Accel",
	website: "https://systemsaccel.com",
	description: "Systems Accel is an all-in-one platform designed to automate processes and boost sales for coaches, consultants, and service providers.",
	icon: "SystemsAccel.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "systems-accel:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.systemsaccel\\.com"),
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
