import type { TechnologyDefinition } from '../../types';

export const modAuthPamTechnologyDefinition = {
	id: "mod-auth-pam",
	name: "mod_auth_pam",
	website: "https://pam.sourceforge.net/mod_auth_pam",
	description: "Mod_auth_pam is used to configure ways for authenticating users.",
	icon: "Apache.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-auth-pam:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_auth_pam(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-auth-pam:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_auth_pam(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"apache-http-server",
	],
} as const satisfies TechnologyDefinition;
