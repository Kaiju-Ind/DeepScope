import type { TechnologyDefinition } from '../../types';

export const blazorTechnologyDefinition = {
	id: "blazor",
	name: "Blazor",
	website: "https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor",
	description: "Blazor is an ASP.NET web UI framework for building interactive web apps with C# and Razor components.",
	icon: "Blazor.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "blazor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("blazor\\.server\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blazor:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("blazor\\.host\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blazor:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("blazor\\.webassembly\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blazor:jsGlobal:3",
			kind: "jsGlobal",
			property: "Blazor",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
