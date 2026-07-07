import type { TechnologyDefinition } from '../../types';

export const microsoftExcelTechnologyDefinition = {
	id: "microsoft-excel",
	name: "Microsoft Excel",
	website: "https://office.microsoft.com/excel",
	description: "Microsoft Excel is an electronic spreadsheet program used for storing, organizing, and manipulating data.",
	icon: "Microsoft Excel.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "microsoft-excel:html:0",
			kind: "html",
			pattern: new RegExp("(?:<html [^>]*xmlns:w=\"urn:schemas-microsoft-com:office:excel\"|<!--\\s*(?:START|END) OF OUTPUT FROM EXCEL PUBLISH AS WEB PAGE WIZARD\\s*-->|<div [^>]*x:publishsource=\"?Excel\"?)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-excel:meta:1",
			kind: "meta",
			key: "ProgId",
			valuePattern: new RegExp("^Excel\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-excel:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Microsoft Excel( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-excel:dom:3",
			kind: "dom",
			selector: "html[xmlns\\:w='urn:schemas-microsoft-com:office:excel'], div[x\\:publishsource='Excel']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "microsoft-excel:html:4",
			kind: "html",
			pattern: new RegExp("(?:<html [^>]*xmlns:w=\"urn:schemas-microsoft-com:office:excel\"|<!--\\s*(?:start|end) of output from excel publish as web page wizard\\s*-->|<div [^>]*x:publishsource=\"?excel\"?)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-excel:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("microsoft excel( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-excel:meta:6",
			kind: "meta",
			key: "progid",
			valuePattern: new RegExp("^excel\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:excel:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
