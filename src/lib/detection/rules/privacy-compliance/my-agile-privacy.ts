import type { TechnologyDefinition } from '../../types';

export const myAgilePrivacyTechnologyDefinition = {
	id: "my-agile-privacy",
	name: "My Agile Privacy",
	website: "https://www.myagileprivacy.com/en/",
	description: "My Agile Privacy is a GDPR solution that ensures website compliance with data protection regulations.",
	icon: "MyAgilePrivacy.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "my-agile-privacy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("myagileprivacy_native"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "my-agile-privacy:jsGlobal:1",
			kind: "jsGlobal",
			property: "MyAgilePixel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "my-agile-privacy:jsGlobal:2",
			kind: "jsGlobal",
			property: "MyAgilePixelProxyBeacon",
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
