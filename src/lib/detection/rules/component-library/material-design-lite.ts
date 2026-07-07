import type { TechnologyDefinition } from '../../types';

export const materialDesignLiteTechnologyDefinition = {
	id: "material-design-lite",
	name: "Material Design Lite",
	website: "https://getmdl.io",
	description: "Material Design Lite is a library of components for web developers.",
	icon: "Material Design Lite.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "material-design-lite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/([\\d.]+))?\\/material(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "material-design-lite:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=\"[^\"]*material(?:\\.[\\w]+-[\\w]+)?(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "material-design-lite:jsGlobal:2",
			kind: "jsGlobal",
			property: "MaterialIconToggle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "material-design-lite:jsGlobal:3",
			kind: "jsGlobal",
			property: "MaterialButton",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "material-design-lite:jsGlobal:4",
			kind: "jsGlobal",
			property: "MaterialLayout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
