import type { TechnologyDefinition } from '../../types';

export const accessallyTechnologyDefinition = {
	id: "accessally",
	name: "AccessAlly",
	website: "https://accessally.com",
	description: "AccessAlly is a customizable platform designed for scalable growth, offering tools for membership management, online courses, and automation.",
	icon: "AccessAlly.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "accessally:jsGlobal:0",
			kind: "jsGlobal",
			property: "accessally_order_form_data_is_during_restore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "accessally:jsGlobal:1",
			kind: "jsGlobal",
			property: "accessally_script_object",
			description: "Page-owned global matches a known technology marker.",
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
