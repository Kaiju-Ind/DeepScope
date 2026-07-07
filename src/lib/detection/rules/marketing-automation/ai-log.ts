import type { TechnologyDefinition } from '../../types';

export const aiLogTechnologyDefinition = {
	id: "ai-log",
	name: "AI LOG",
	website: "https://www.ai-log.biz/",
	description: "AI LOG is a marketing automation and fraud click prevention tool.",
	icon: "AI-LOG.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ai-log:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ai-log\\.biz\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ai-log:jsGlobal:1",
			kind: "jsGlobal",
			property: "ai_getScript_load",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
