import type { TechnologyDefinition } from '../../types';

export const preezieTechnologyDefinition = {
	id: "preezie",
	name: "Preezie",
	website: "https://preezie.com",
	description: "Preezie is a provider of tools and education that enables retailers to implement an online sales assistant through a guided conversion and product discovery platform.",
	icon: "Preezie.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "preezie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ui-widgets\\.preezie\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "preezie:jsGlobal:1",
			kind: "jsGlobal",
			property: "PREEZIE_GUIDE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "preezie:jsGlobal:2",
			kind: "jsGlobal",
			property: "preezieJsonpFunction",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "preezie:jsGlobal:3",
			kind: "jsGlobal",
			property: "preeziePageScriptExecuted",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
