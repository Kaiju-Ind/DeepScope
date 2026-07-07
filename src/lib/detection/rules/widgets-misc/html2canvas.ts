import type { TechnologyDefinition } from '../../types';

export const html2canvasTechnologyDefinition = {
	id: "html2canvas",
	name: "html2canvas",
	website: "https://html2canvas.hertzen.com/",
	description: "Screenshots with JavaScript.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "html2canvas:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("html2canvas(?:\\.min)?(?:[_\\w]{0,8})?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "html2canvas:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?html2canvas(?:\\.min)?(?:[_\\w]{0,8})?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
