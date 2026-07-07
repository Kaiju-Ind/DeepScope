import type { TechnologyDefinition } from '../../types';

export const fingerprintjsTechnologyDefinition = {
	id: "fingerprintjs",
	name: "FingerprintJS",
	website: "https://fingerprintjs.com",
	description: "FingerprintJS is a browser fingerprinting library that queries browser attributes and computes a hashed visitor identifier from them.",
	icon: "FingerprintJS.svg",
	categories: [
		"widgets-misc",
		"privacy-compliance",
	],
	rules: [
		{
			id: "fingerprintjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fingerprint(?:\\/fp)?(\\d)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fingerprintjs:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("fingerprintjs(?:\\-pro|2)?(?:@|\\/)(\\d.*?)?\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fingerprintjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "Fingerprint",
			valuePattern: new RegExp("(\\d)?$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fingerprintjs:jsGlobal:3",
			kind: "jsGlobal",
			property: "Fingerprint2",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fingerprintjs:jsGlobal:4",
			kind: "jsGlobal",
			property: "Fingerprint2.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fingerprintjs:jsGlobal:5",
			kind: "jsGlobal",
			property: "FingerprintJS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
