import type { TechnologyDefinition } from '../../types';

/**
 * Detects View Transitions API usage from CSS transition names or JavaScript
 * calls. CSS evidence is enough because `view-transition-name` only affects the
 * native View Transitions rendering model.
 */
export const viewTransitionsApiTechnologyDefinition = {
	id: "view-transitions-api",
	name: "View Transitions API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API",
	description: "The View Transitions API coordinates native animated transitions between DOM states or navigations.",
	categories: [
		"animation",
		"widgets-misc",
	],
	rules: [
		{
			id: "view-transitions-api:stylesheetContent:property",
			kind: "stylesheetContent",
			pattern: /\bview-transition-name\s*:/i,
			confidence: 90,
			description: "Captured stylesheet content assigns native view-transition names.",
		},
		{
			id: "view-transitions-api:scriptContent:start-view-transition",
			kind: "scriptContent",
			pattern: /\bdocument\.startViewTransition\s*\(/i,
			confidence: 95,
			description: "Bundled script content calls document.startViewTransition.",
		},
	],
} as const satisfies TechnologyDefinition;
