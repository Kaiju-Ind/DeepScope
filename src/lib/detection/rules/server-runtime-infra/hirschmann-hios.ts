import type { TechnologyDefinition } from '../../types';

export const hirschmannHiosTechnologyDefinition = {
	id: "hirschmann-hios",
	name: "Hirschmann HiOS",
	website: "https://hirschmann.com/",
	description: "Hirschmann HiOS is an operating system for industrial network equipment.",
	icon: "hirschmann_OS.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "hirschmann-hios:html:0",
			kind: "html",
			pattern: new RegExp("(?:HiSecOS-|HiOS-.+-)\\d+\\.\\d+\\.\\d+", "i"),
			confidence: 95,
			description: "Document HTML contains a Hirschmann HiOS version marker.",
		},
		{
			id: "hirschmann-hios:text:1",
			kind: "text",
			pattern: new RegExp("(HiSecOS-|HiOS-.+-)(\\d+\\.\\d+\\.\\d+)"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Page text contains a known technology marker.",
		},

	],
	metadata: {
		cpe: "cpe:2.3:o:belden:hirschmann_hios:*:*:*:*:*:*:*:*",
	},
	requires: [
		"google-web-toolkit",
		"java",
	],
} as const satisfies TechnologyDefinition;
