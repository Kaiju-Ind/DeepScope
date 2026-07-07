import type { TechnologyDefinition } from '../../types';

export const aspNetBoilerplateTechnologyDefinition = {
	id: "asp-net-boilerplate",
	name: "ASP.NET Boilerplate",
	website: "https://www.aspnetboilerplate.com",
	description: "ASP.NET Boilerplate is a general purpose application framework especially designed for new modern web applications. It uses already familiar tools and implements best practices around them to provide you a SOLID development experience.",
	icon: "aspnetboilerplate.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "asp-net-boilerplate:jsGlobal:0",
			kind: "jsGlobal",
			property: "abp.aspnetboilerplate.version",
			valuePattern: new RegExp("(.*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "asp-net-boilerplate:jsGlobal:1",
			kind: "jsGlobal",
			property: "abp.timing.utcClockProvider",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
