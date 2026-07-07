import type { TechnologyDefinition } from '../../types';

export const chartJsTechnologyDefinition = {
	id: "chart-js",
	name: "Chart.js",
	website: "https://www.chartjs.org",
	description: "Chart.js is an open-source JavaScript library that allows you to draw different types of charts by using the HTML5 canvas element.",
	icon: "Chart.js.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "chart-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/Chart(?:\\.bundle)?(?:\\.min)?\\.js"),
			confidence: 75,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chart-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("chartjs\\.org\\/dist\\/([\\d.]+(?:-[^/]+)?|master|latest)\\/Chart.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chart-js:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("cdnjs\\.cloudflare\\.com\\/ajax\\/libs\\/Chart\\.js\\/([\\d.]+(?:-[^/]+)?)\\/Chart.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chart-js:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net\\/(?:npm|gh\\/chartjs)\\/chart\\.js@([\\d.]+(?:-[^/]+)?|latest)\\/dist\\/Chart.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chart-js:jsGlobal:4",
			kind: "jsGlobal",
			property: "Chart",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chart-js:jsGlobal:5",
			kind: "jsGlobal",
			property: "Chart.defaults.doughnut",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chart-js:jsGlobal:6",
			kind: "jsGlobal",
			property: "chart.ctx.bezierCurveTo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chart-js:scriptSrc:7",
			kind: "scriptSrc",
			pattern: new RegExp("\\/chart(?:\\.bundle)?(?:\\.min)?\\.js"),
			confidence: 75,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chart-js:scriptSrc:8",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net\\/(?:npm|gh\\/chartjs)\\/chart\\.js@([\\d.]+(?:-[^/]+)?|latest)\\/dist\\/chart.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chart-js:scriptSrc:9",
			kind: "scriptSrc",
			pattern: new RegExp("cdnjs\\.cloudflare\\.com\\/ajax\\/libs\\/chart\\.js\\/([\\d.]+(?:-[^/]+)?)\\/chart.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chart-js:scriptSrc:10",
			kind: "scriptSrc",
			pattern: new RegExp("chartjs\\.org\\/dist\\/([\\d.]+(?:-[^/]+)?|master|latest)\\/chart.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
