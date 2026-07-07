import type { TechnologyDefinition } from '../../types';

export const popoverApiTechnologyDefinition = {
	id: "popover-api",
	name: "Popover API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",
	description: "Uses native HTML popover attributes or Popover API methods.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "popover-api:html:attribute",
			kind: "html",
			pattern: new RegExp("<[^>]+\\b(?:popover(?:=(?:\"[^\"]*\"|'[^']*'|[^\\s>]+))?|popovertarget(?:action)?=(?:\"[^\"]+\"|'[^']+'|[^\\s>]+))", "i"),
			confidence: 95,
			description: "Document uses native popover attributes.",
		},
		{
			id: "popover-api:scriptContent:method",
			kind: "scriptContent",
			pattern: new RegExp("\\b(?:showPopover|hidePopover|togglePopover)\\s*\\(", "i"),
			confidence: 95,
			description: "Script content uses Popover API methods.",
		},
	],
} as const satisfies TechnologyDefinition;
