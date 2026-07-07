import type { TechnologyDefinition } from '../../types';

export const snapcallTechnologyDefinition = {
	id: "snapcall",
	name: "SnapCall",
	website: "https://www.snapcall.io",
	description: "SnapCall is a Video AI solution designed to enhance customer support by providing real-time video interactions.",
	icon: "SnapCall.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "snapcall:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.snapcall\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "snapcall:jsGlobal:1",
			kind: "jsGlobal",
			property: "sc_api",
			valuePattern: new RegExp("api\\.snapcall\\.io"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snapcall:jsGlobal:2",
			kind: "jsGlobal",
			property: "snapcallAPI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
