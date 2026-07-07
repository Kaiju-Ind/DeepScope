import type { TechnologyDefinition } from '../../types';

export const sphinxTechnologyDefinition = {
	id: "sphinx",
	name: "Sphinx",
	website: "https://www.sphinx-doc.org/",
	description: "Sphinx is a documentation generator for Python projects using reStructuredText.",
	icon: "Sphinx.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "sphinx:html:0",
			kind: "html",
			pattern: new RegExp("Created using <a href=\"https?:\\/\\/(?:www\\.)?sphinx-doc\\.org\\/\">Sphinx<\\/a> ([0-9.]+)\\."),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sphinx:jsGlobal:1",
			kind: "jsGlobal",
			property: "DOCUMENTATION_OPTIONS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sphinx:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sphinx-book-theme\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sphinx:dom:3",
			kind: "dom",
			selector: "div.sphinxsidebar > div.sphinxsidebarwrapper",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sphinx:dom:4",
			kind: "dom",
			selector: "p.sphinx-version",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sphinx:text:5",
			kind: "text",
			pattern: new RegExp("Created using Sphinx ([\\d]+(?:\\.[\\d]+)*)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page text contains a known Sphinx generator signature.",
		},
		{
			id: "sphinx:jsGlobal:6",
			kind: "jsGlobal",
			property: "SPHINX_HIGHLIGHT_ENABLED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sphinx:jsGlobal:7",
			kind: "jsGlobal",
			property: "SphinxHighlight",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sphinx:jsGlobal:8",
			kind: "jsGlobal",
			property: "SphinxRtdTheme",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sphinx:html:9",
			kind: "html",
			pattern: new RegExp("created using <a href=\"https?:\\/\\/(?:www\\.)?sphinx-doc\\.org\\/\">sphinx<\\/a> ([0-9.]+)\\."),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
