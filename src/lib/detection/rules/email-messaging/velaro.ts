import type { TechnologyDefinition } from '../../types';

export const velaroTechnologyDefinition = {
	id: "velaro",
	name: "Velaro",
	website: "https://velaro.com/product/live-chat",
	description: "Velaro is a live chat platform designed to engage website visitors and customers, enhancing online sales conversions.",
	icon: "Velaro.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "velaro:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/velaroscripts\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "velaro:jsGlobal:1",
			kind: "jsGlobal",
			property: "Velaro.Call",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "velaro:jsGlobal:2",
			kind: "jsGlobal",
			property: "isVelaroChatClicked",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
