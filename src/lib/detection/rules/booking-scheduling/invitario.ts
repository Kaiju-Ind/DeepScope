import type { TechnologyDefinition } from '../../types';

export const invitarioTechnologyDefinition = {
	id: "invitario",
	name: "Invitario",
	website: "https://invitario.com",
	description: "Invitario is an event marketing platform that provides a digital invitation and guest management for business events.",
	icon: "Invitario.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "invitario:jsGlobal:0",
			kind: "jsGlobal",
			property: "InvitarioWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
