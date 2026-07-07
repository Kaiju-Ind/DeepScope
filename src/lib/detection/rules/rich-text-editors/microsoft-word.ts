import type { TechnologyDefinition } from '../../types';

export const microsoftWordTechnologyDefinition = {
	id: "microsoft-word",
	name: "Microsoft Word",
	website: "https://office.microsoft.com/word",
	description: "MS Word is a word-processing program used primarily for creating documents.",
	icon: "Microsoft Word.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "microsoft-word:html:0",
			kind: "html",
			pattern: new RegExp("(?:<html [^>]*xmlns:w=\"urn:schemas-microsoft-com:office:word\"|<w:WordDocument>|<div [^>]*class=\"?WordSection1[\" >]|<style[^>]*>[^>]*@page WordSection1)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-word:meta:1",
			kind: "meta",
			key: "ProgId",
			valuePattern: new RegExp("^Word\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-word:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Microsoft Word( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-word:dom:3",
			kind: "dom",
			selector: "html[xmlns\\:w='urn:schemas-microsoft-com:office:word'], div[class*='WordSection1']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "microsoft-word:html:4",
			kind: "html",
			pattern: new RegExp("(?:<html [^>]*xmlns:w=\"urn:schemas-microsoft-com:office:word\"|<w:worddocument>|<div [^>]*class=\"?wordsection1[\" >]|<style[^>]*>[^>]*@page wordsection1)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-word:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("microsoft word( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-word:meta:6",
			kind: "meta",
			key: "progid",
			valuePattern: new RegExp("^word\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:word:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
