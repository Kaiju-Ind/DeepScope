import type { TechnologyDefinition } from '../../types';

export const almalinuxTechnologyDefinition = {
	id: "almalinux",
	name: "AlmaLinux",
	website: "https://almalinux.org",
	description: "AlmaLinux is an open-source, community-driven Linux operating system that fills the gap left by the discontinuation of the CentOS Linux stable release.",
	icon: "AlmaLinux.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "almalinux:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("AlmaLinux", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "almalinux:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("almalinux", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:o:almalinux:almalinux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
