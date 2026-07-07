import type { TechnologyDefinition } from '../../types';

export const zotaboxTechnologyDefinition = {
	id: "zotabox",
	name: "Zotabox",
	website: "https://info.zotabox.com",
	description: "Zotabox is marketing tool which includes popups, header bars, page/form builder, testimonial, live chat, etc.",
	icon: "zotabox.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zotabox:jsGlobal:0",
			kind: "jsGlobal",
			property: "Zotabox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zotabox:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zotabox_Init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
