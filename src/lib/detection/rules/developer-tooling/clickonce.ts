import type { TechnologyDefinition } from '../../types';

export const clickonceTechnologyDefinition = {
	id: "clickonce",
	name: "ClickOnce",
	website: "https://learn.microsoft.com/en-us/visualstudio/deployment/clickonce-security-and-deployment",
	description: "ClickOnce is a Microsoft .NET deployment technology that enables the creation of self-updating Windows-based applications that can be installed and run with minimal user interaction.",
	icon: "default.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "clickonce:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.ClickOnceInfoText"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "clickonce:dom:1",
			kind: "dom",
			selector: "a[href='https://go.microsoft.com/fwlink/?LinkId=154571']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "clickonce:text:2",
			kind: "text",
			pattern: new RegExp("ClickOnce and .NET Framework Resources"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
