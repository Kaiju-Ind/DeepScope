import type { TechnologyDefinition } from '../../types';

export const opentextWebTechnologyDefinition = {
	id: "opentext-web",
	name: "OpenText Web",
	website: "https://www.opentext.com/products/content-management-system",
	description: "OpenText Web is a web content management platform that supports hybrid headless environments, allowing developers to use preferred tools and enabling marketers to author, test, and publish content seamlessly, with a focus on performance, scalability, and compliance​.",
	icon: "OpenText.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "opentext-web:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+published by Open Text Web Solutions"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "opentext-web:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+published by open text web solutions"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
