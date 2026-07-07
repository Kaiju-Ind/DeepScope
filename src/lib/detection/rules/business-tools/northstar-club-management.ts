import type { TechnologyDefinition } from '../../types';

export const northstarClubManagementTechnologyDefinition = {
	id: "northstar-club-management",
	name: "Northstar Club Management",
	website: "https://www.globalnorthstar.com",
	description: "Northstar Club Management is a platform that integrates membership, accounting, reservations, events, and communication tools to streamline daily operations for private clubs and associations.",
	icon: "NorthstarClubManagement.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "northstar-club-management:header:0",
			kind: "header",
			key: "Portal",
			valuePattern: new RegExp("^Northstar Connect", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "northstar-club-management:header:1",
			kind: "header",
			key: "portal",
			valuePattern: new RegExp("^northstar connect", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:globalnorthstar:northstar_club_management:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
