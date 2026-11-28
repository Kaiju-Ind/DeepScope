import type { TechnologyDefinition } from "../../types.ts";

/** Detects declarative invoker commands using `command` and `commandfor`, stable in Chrome 135. */
export const invokerCommandsTechnologyDefinition: TechnologyDefinition = {
	id: 'invoker-commands',
	name: 'Invoker Commands',
	website: 'https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-command',
	description:
		'Invoker Commands let button elements dispatch declarative commands to another element through command and commandfor attributes.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'invoker-commands:dom:button',
			kind: 'dom',
			selector: 'button[command][commandfor]',
			confidence: 100,
			description: 'Rendered DOM contains a button with both invoker-command attributes.',
		},
		{
			id: 'invoker-commands:html:button',
			kind: 'html',
			pattern: /<button(?=[\s>])(?=[^>]*\scommand\s*=)(?=[^>]*\scommandfor\s*=)[^>]*>/i,
			confidence: 100,
			description: 'Captured HTML declares both command and commandfor on a button element.',
		},
	],
} as const satisfies TechnologyDefinition;
