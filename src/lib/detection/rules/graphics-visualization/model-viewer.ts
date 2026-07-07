import type { TechnologyDefinition } from '../../types';

export const modelViewerTechnologyDefinition = {
	id: "model-viewer",
	name: "<model-viewer>",
	website: "https://modelviewer.dev",
	description: "<model-viewer> is an open-source web component developed by Google and maintained through GitHub. <model-viewer> aims at putting 3D content on the web easily with a few lines of HTML code. This was first introduced with Chrome 72 in July 2019 and enables users to view 3D in the browser and mobile devices.",
	icon: "model-viewer.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "model-viewer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/model-viewer\\/dist\\/model-viewer\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "model-viewer:dom:1",
			kind: "dom",
			selector: "model-viewer",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
