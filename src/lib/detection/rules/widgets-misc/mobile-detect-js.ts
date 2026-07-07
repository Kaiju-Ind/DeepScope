import type { TechnologyDefinition } from '../../types';

export const mobileDetectJsTechnologyDefinition = {
	id: "mobile-detect-js",
	name: "mobile-detect.js",
	website: "https://hgoebl.github.io/mobile-detect.js/doc/MobileDetect.html",
	description: "Mobile-detect.js is a compact JavaScript library designed to detect devices by comparing patterns against a given User-Agent string.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mobile-detect-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mobile-detect(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
