import type { TechnologyDefinition } from '../../types';

export const jquerySparklinesTechnologyDefinition = {
	id: "jquery-sparklines",
	name: "jQuery Sparklines",
	website: "https://omnipotent.net/jquery.sparkline/",
	description: "jQuery Sparklines is a plugin that generates sparklines (small inline charts) directly in the browser using data supplied either inline in the HTML, or via javascript.",
	categories: [
		"ui-library",
		"graphics-visualization",
	],
	rules: [
		{
			id: "jquery-sparklines:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.sparkline.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
