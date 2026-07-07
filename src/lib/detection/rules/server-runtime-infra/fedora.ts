import type { TechnologyDefinition } from '../../types';

export const fedoraTechnologyDefinition = {
	id: "fedora",
	name: "Fedora",
	website: "https://fedoraproject.org",
	description: "Fedora is a free open-source Linux-based operating system.",
	icon: "Fedora.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "fedora:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Fedora", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fedora:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("fedora", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:fedoraproject:fedora:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
