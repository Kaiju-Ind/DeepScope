import type { TechnologyDefinition } from '../../types';

export const kasadaTechnologyDefinition = {
	id: "kasada",
	name: "Kasada",
	website: "https://www.kasada.io",
	description: "Kasada is a cybersecurity company that provides a platform to protect websites and web applications from bot attacks and malicious activities.",
	icon: "Kasada.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "kasada:jsGlobal:0",
			kind: "jsGlobal",
			property: "KPSDK.configure",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kasada:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^KP_UIDz$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kasada:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^kp_uidz$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kasada:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("\\bKPSDK\\b"),
			confidence: 85,
			description: "Inline script content initializes the Kasada protection SDK.",
		},
		{
			id: "kasada:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("kpsdk-(?:load|ready)", "i"),
			confidence: 85,
			description: "Inline script content listens for Kasada SDK lifecycle events.",
		},
		{
			id: "kasada:scriptContent:5",
			kind: "scriptContent",
			pattern: new RegExp("x-is-human"),
			confidence: 75,
			description: "Inline script content adds Kasada challenge headers to protected requests.",
		},
		{
			id: "kasada:resourceUrl:6",
			kind: "resourceUrl",
			pattern: new RegExp("/[0-9a-f-]{36}/[0-9a-f-]{36}/(?:p|c)\\.js(?:\\?|$)", "i"),
			confidence: 75,
			description: "Observed resource URL follows the Kasada SDK challenge script path shape.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
