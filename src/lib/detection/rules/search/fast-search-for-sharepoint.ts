import type { TechnologyDefinition } from '../../types';

export const fastSearchForSharepointTechnologyDefinition = {
	id: "fast-search-for-sharepoint",
	name: "FAST Search for SharePoint",
	website: "https://sharepoint.microsoft.com/en-us/product/capabilities/search/Pages/Fast-Search.aspx",
	description: "FAST Search for SharePoint is the search engine for Microsoft's SharePoint collaboration platform. Its purpose is helping SharePoint users locate and retrieve stored enterprise content.",
	icon: "FAST Search for SharePoint.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "fast-search-for-sharepoint:html:0",
			kind: "html",
			pattern: new RegExp("<input[^>]+ name=\"ParametricSearch"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fast-search-for-sharepoint:url:1",
			kind: "url",
			pattern: new RegExp("Pages\\/SearchResults\\.aspx\\?k="),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "fast-search-for-sharepoint:dom:2",
			kind: "dom",
			selector: "input[name*='ParametricSearch']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fast-search-for-sharepoint:html:3",
			kind: "html",
			pattern: new RegExp("<input[^>]+ name=\"parametricsearch"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"microsoft-asp-net",
		"microsoft-sharepoint",
	],
} as const satisfies TechnologyDefinition;
