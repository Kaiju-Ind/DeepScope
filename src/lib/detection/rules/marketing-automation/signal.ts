import type { TechnologyDefinition } from '../../types';

export const signalTechnologyDefinition = {
	id: "signal",
	name: "Signal",
	website: "https://www.signal.co/",
	description: "Signal is a cross-platform encrypted messaging service.",
	icon: "signal.png",
	categories: [
		"marketing-automation",
		"tag-management",
	],
	rules: [
		{
			id: "signal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/s\\.btstatic\\.com\\/tag\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "signal:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/s\\.thebrighttag\\.com\\/iframe\\?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "signal:jsGlobal:2",
			kind: "jsGlobal",
			property: "signalData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
