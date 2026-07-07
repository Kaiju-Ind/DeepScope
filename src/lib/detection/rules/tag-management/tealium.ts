import type { TechnologyDefinition } from '../../types';

export const tealiumTechnologyDefinition = {
	id: "tealium",
	name: "Tealium",
	website: "https://tealium.com",
	description: "Tealium provides a sales enterprise tag management system and marketing software.",
	icon: "Tealium.png",
	categories: [
		"tag-management",
		"marketing-automation",
	],
	rules: [
		{
			id: "tealium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^(?:https?:)?\\/\\/tags\\.tiqcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tealium:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/tealium\\/utag\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tealium:jsGlobal:2",
			kind: "jsGlobal",
			property: "TEALIUMENABLED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tealium:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("tealium_js_path"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "tealium:jsGlobal:4",
			kind: "jsGlobal",
			property: "TealiumUtils",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tealium:jsGlobal:5",
			kind: "jsGlobal",
			property: "__tealium_twc_switch",
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
