import type { TechnologyDefinition } from '../../types';

export const iisTechnologyDefinition = {
	id: "iis",
	name: "IIS",
	website: "https://www.iis.net",
	description: "Internet Information Services (IIS) is an extensible web server software created by Microsoft for use with the Windows NT family.",
	icon: "Microsoft.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "iis:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^(?:Microsoft-)?IIS(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "iis:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:microsoft-)?iis(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:internet_information_server:*:*:*:*:*:*:*:*",
	},
	implies: [
		"windows-server",
	],
} as const satisfies TechnologyDefinition;
