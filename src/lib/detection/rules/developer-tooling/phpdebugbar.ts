import type { TechnologyDefinition } from '../../types';

export const phpdebugbarTechnologyDefinition = {
	id: "phpdebugbar",
	name: "PHPDebugBar",
	website: "https://phpdebugbar.com/",
	icon: "phpdebugbar.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "phpdebugbar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("debugbar.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "phpdebugbar:jsGlobal:1",
			kind: "jsGlobal",
			property: "PhpDebugBar",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "phpdebugbar:jsGlobal:2",
			kind: "jsGlobal",
			property: "phpdebugbar",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
