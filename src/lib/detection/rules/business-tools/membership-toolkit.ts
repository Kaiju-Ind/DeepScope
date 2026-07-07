import type { TechnologyDefinition } from '../../types';

export const membershipToolkitTechnologyDefinition = {
	id: "membership-toolkit",
	name: "Membership Toolkit",
	website: "https://membershiptoolkit.com",
	description: "Membership Toolkit is a volunteer management platform that organizes scheduling, tracks participation, and streamlines administrative tasks for groups that coordinate community, school, or event-based service activities.",
	icon: "MembershipToolkit.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "membership-toolkit:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.membershiptoolkit\\.com"),
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
