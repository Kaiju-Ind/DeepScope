import type { TechnologyDefinition } from '../../types';

export const cryptoJsTechnologyDefinition = {
	id: "crypto-js",
	name: "crypto-js",
	website: "https://github.com/brix/crypto-js",
	description: "crypto-js is a JavaScript library that implements common cryptographic algorithms and encodings.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "crypto-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/([\\d\\.-]+))?\\/crypto-js(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crypto-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "CryptoJS.Rabbit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crypto-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "CryptoJS.algo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:crypto-js_project:crypto-js:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
