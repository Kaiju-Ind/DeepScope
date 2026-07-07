import type { TechnologyDefinition } from '../../types';

export const pixijsTechnologyDefinition = {
	id: "pixijs",
	name: "PIXIjs",
	website: "https://www.pixijs.com",
	description: "PIXIjs is a free open-source 2D engine used to make animated websites and HTML5 games.",
	icon: "PIXIjs.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "pixijs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pixi(?:\\.min|-legacy)?\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pixijs:url:1",
			kind: "url",
			pattern: new RegExp(".+\\.pixijs\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pixijs:jsGlobal:2",
			kind: "jsGlobal",
			property: "PIXI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixijs:jsGlobal:3",
			kind: "jsGlobal",
			property: "PIXI.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixijs:jsGlobal:4",
			kind: "jsGlobal",
			property: "PIXI_WEBWORKER_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixijs:dom:5",
			kind: "dom",
			selector: "div[class*='pixi-hitbox']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pixijs:jsGlobal:6",
			kind: "jsGlobal",
			property: "webpackChunkpixi_docusaurus",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
