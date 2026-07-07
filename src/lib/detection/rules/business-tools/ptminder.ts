import type { TechnologyDefinition } from '../../types';

export const ptminderTechnologyDefinition = {
	id: "ptminder",
	name: "PTminder",
	website: "https://www.ptminder.com",
	description: "PTminder is a business management platform designed for personal trainers.",
	icon: "PTMinder.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "ptminder:jsGlobal:0",
			kind: "jsGlobal",
			property: "ptminder_clients_auth",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ptminder:jsGlobal:1",
			kind: "jsGlobal",
			property: "ptminder_jsonp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ptminder:jsGlobal:2",
			kind: "jsGlobal",
			property: "ptminder_jsonp_forgot_password",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ptminder:jsGlobal:3",
			kind: "jsGlobal",
			property: "ptminder_jsonp_keep_logged",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ptminder:jsGlobal:4",
			kind: "jsGlobal",
			property: "ptminder_jsonp_sign_up",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
