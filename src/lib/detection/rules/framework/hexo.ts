import type { TechnologyDefinition } from '../../types';

export const hexoTechnologyDefinition = {
	id: "hexo",
	name: "Hexo",
	website: "https://hexo.io",
	description: "Hexo is a blog framework powered by Node.js.",
	icon: "Hexo.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "hexo:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"https?:\\/\\/hexo\\.io\\/?\"[^>]*>Hexo<\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "hexo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Hexo(?: v?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hexo:html:2",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"https?:\\/\\/hexo\\.io\\/?\"[^>]*>hexo<\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "hexo:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("hexo(?: v?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:hexo:hexo:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
