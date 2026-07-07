import type { TechnologyDefinition } from '../../types';

export const livezillaTechnologyDefinition = {
	id: "livezilla",
	name: "LiveZilla",
	website: "https://www.livezilla.net",
	description: "LiveZilla is a web-based live support platform.",
	icon: "LiveZilla.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "livezilla:dom:0",
			kind: "dom",
			selector: "#lz_overlay_chat",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "livezilla:jsGlobal:1",
			kind: "jsGlobal",
			property: "lz_chat_execute",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livezilla:jsGlobal:2",
			kind: "jsGlobal",
			property: "lz_code_id",
			valuePattern: new RegExp("(?:[\\w\\d]+)"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livezilla:jsGlobal:3",
			kind: "jsGlobal",
			property: "lz_tracking_set_widget_visibility",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"mid",
			"onetime",
		],
		cpe: "cpe:2.3:a:livezilla:livezilla:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
