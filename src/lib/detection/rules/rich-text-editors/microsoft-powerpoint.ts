import type { TechnologyDefinition } from '../../types';

export const microsoftPowerpointTechnologyDefinition = {
	id: "microsoft-powerpoint",
	name: "Microsoft PowerPoint",
	website: "https://office.microsoft.com/powerpoint",
	description: "Microsoft PowerPoint is a tool to create presentations using simple drag and drop tools.",
	icon: "Microsoft PowerPoint.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "microsoft-powerpoint:html:0",
			kind: "html",
			pattern: new RegExp("(?:<html [^>]*xmlns:w=\"urn:schemas-microsoft-com:office:powerpoint\"|<link rel=\"?Presentation-XML\"? href=\"?[^\"]+\\.xml\"?>|<o:PresentationFormat>[^<]+<\\/o:PresentationFormat>[^!]+<o:Slides>\\d+<\\/o:Slides>(?:[^!]+<o:Version>([\\d.]+)<\\/o:Version>)?)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-powerpoint:meta:1",
			kind: "meta",
			key: "ProgId",
			valuePattern: new RegExp("^PowerPoint\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-powerpoint:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Microsoft PowerPoint ( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-powerpoint:dom:3",
			kind: "dom",
			selector: "html[xmlns\\:w='urn:schemas-microsoft-com:office:powerpoint'], link[rel='Presentation-XML'][href*='.xml']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "microsoft-powerpoint:html:4",
			kind: "html",
			pattern: new RegExp("(?:<html [^>]*xmlns:w=\"urn:schemas-microsoft-com:office:powerpoint\"|<link rel=\"?presentation-xml\"? href=\"?[^\"]+\\.xml\"?>|<o:presentationformat>[^<]+<\\/o:presentationformat>[^!]+<o:slides>\\d+<\\/o:slides>(?:[^!]+<o:version>([\\d.]+)<\\/o:version>)?)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-powerpoint:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("microsoft powerpoint ( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-powerpoint:meta:6",
			kind: "meta",
			key: "progid",
			valuePattern: new RegExp("^powerpoint\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:powerpoint:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
