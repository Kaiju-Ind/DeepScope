import type { TechnologyDefinition } from '../../types';

export const miniservTechnologyDefinition = {
	id: "miniserv",
	name: "MiniServ",
	website: "https://github.com/webmin/webmin/blob/master/miniserv.pl",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "miniserv:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("MiniServ\\/([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "miniserv:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("miniserv\\/([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"webmin",
	],
} as const satisfies TechnologyDefinition;
