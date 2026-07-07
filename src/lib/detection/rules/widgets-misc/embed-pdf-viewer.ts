import type { TechnologyDefinition } from '../../types';

export const embedPdfViewerTechnologyDefinition = {
	id: "embed-pdf-viewer",
	name: "Embed PDF Viewer",
	website: "https://wordpress.org/plugins/embed-pdf-viewer",
	description: "Embed a PDF from the Media Library or elsewhere via oEmbed.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "embed-pdf-viewer:dom:0",
			kind: "dom",
			selector: "#embed-pdf-viewer-css, link[href*='/wp-content/plugins/embed-pdf-viewer/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
