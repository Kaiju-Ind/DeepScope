import type { TechnologyDefinition } from '../../types';

export const subversionTechnologyDefinition = {
	id: "subversion",
	name: "Subversion",
	website: "https://subversion.apache.org",
	description: "Subversion is a centralized version control system for managing files and directories across software development teams.",
	icon: "Subversion.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "subversion:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\sSVN\\/([\\d\\.]+)\\s", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "subversion:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\ssvn\\/([\\d\\.]+)\\s", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apache:subversion:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
