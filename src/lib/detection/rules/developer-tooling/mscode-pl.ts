import type { TechnologyDefinition } from '../../types';

export const mscodePlTechnologyDefinition = {
	id: "mscode-pl",
	name: "MsCode.pl",
	website: "https://mscode.pl",
	description: "MsCode.pl is a platform focused on developing innovative solutions in programming, hosting, and marketing.",
	icon: "MsCode.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "mscode-pl:header:0",
			kind: "header",
			key: "X-Hosting-Provider",
			valuePattern: new RegExp("MsCode\\.pl", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mscode-pl:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("MsCode\\.pl", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mscode-pl:header:2",
			kind: "header",
			key: "x-hosting-provider",
			valuePattern: new RegExp("mscode\\.pl", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mscode-pl:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("mscode\\.pl", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
