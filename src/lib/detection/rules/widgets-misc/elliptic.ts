import type { TechnologyDefinition } from '../../types';

export const ellipticTechnologyDefinition = {
	id: "elliptic",
	name: "Elliptic",
	website: "https://github.com/indutny/elliptic",
	description: "Fast Elliptic Curve Cryptography in plain javascript.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "elliptic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("elliptic(?:[\\w\\.-]{0,27})?(?:\\.bundle)?(?:\\.chunk)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
