import type { TechnologyDefinition } from '../../types';

export const adobeMuseTechnologyDefinition = {
	id: "adobe-muse",
	name: "Adobe Muse",
	website: "https://helpx.adobe.com/muse/kb/adobe-muse-end-of-service.html",
	description: "Adobe Muse is a no code offline website builder used to create fixed, fluid, or adaptive websites, without the need to write code.",
	icon: "AdobeMuse.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "adobe-muse:jsGlobal:0",
			kind: "jsGlobal",
			property: "Muse",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-muse:jsGlobal:1",
			kind: "jsGlobal",
			property: "museConfigLoadedAndExecuted",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-muse:jsGlobal:2",
			kind: "jsGlobal",
			property: "muse_init",
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
