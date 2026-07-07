import type { TechnologyDefinition } from '../../types';

export const rawgitTechnologyDefinition = {
	id: "rawgit",
	name: "RawGit",
	website: "https://rawgit.com",
	description: "RawGit is a service that delivers raw files directly from GitHub, Bitbucket, or GitLab with correct Content-Type headers.",
	icon: "RawGit.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "rawgit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.rawgit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
