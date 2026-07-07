import type { TechnologyDefinition } from '../../types';

export const platformosTechnologyDefinition = {
	id: "platformos",
	name: "PlatformOS",
	website: "https://www.platform-os.com",
	icon: "PlatformOS.svg",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "platformos:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^platformOS$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "platformos:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^platformos$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
