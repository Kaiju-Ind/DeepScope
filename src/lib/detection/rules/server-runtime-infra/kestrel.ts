import type { TechnologyDefinition } from '../../types';

export const kestrelTechnologyDefinition = {
	id: "kestrel",
	name: "Kestrel",
	website: "https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel",
	icon: "kestrel.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "kestrel:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Kestrel", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kestrel:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^kestrel", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
