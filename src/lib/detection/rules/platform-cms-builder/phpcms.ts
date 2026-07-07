import type { TechnologyDefinition } from '../../types';

export const phpcmsTechnologyDefinition = {
	id: "phpcms",
	name: "phpCMS",
	website: "https://phpcms.de",
	icon: "PHP.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "phpcms:jsGlobal:0",
			kind: "jsGlobal",
			property: "phpcms",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phpcms:phpcms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
