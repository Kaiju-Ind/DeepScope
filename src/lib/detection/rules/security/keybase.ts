import type { TechnologyDefinition } from '../../types';

export const keybaseTechnologyDefinition = {
	id: "keybase",
	name: "Keybase",
	website: "https://keybase.io/",
	description: "Keybase is for keeping everyone's chats and files safe, from families to communities to companies. MacOS, Windows, Linux, iPhone, and Android.",
	icon: "Keybase.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "keybase:dns:0",
			kind: "dns",
			valuePattern: new RegExp("keybase-site-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:keybase:keybase:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
