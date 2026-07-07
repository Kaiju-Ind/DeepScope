import type { TechnologyDefinition } from '../../types';

export const sonlineTechnologyDefinition = {
	id: "sonline",
	name: "Sonline",
	website: "https://sonline.su",
	description: "Sonline is a beauty salon software developed in Russia.",
	icon: "Sonline.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "sonline:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/sonline\\.su\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sonline:jsGlobal:1",
			kind: "jsGlobal",
			property: "showSonlineWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sonline:jsGlobal:2",
			kind: "jsGlobal",
			property: "sonlineWidgetOptions",
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
