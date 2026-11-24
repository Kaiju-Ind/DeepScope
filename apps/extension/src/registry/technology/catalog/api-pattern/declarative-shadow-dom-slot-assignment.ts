import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects declarative manual slot assignment on shadow-root template elements. */
export const declarativeShadowDomSlotAssignmentTechnologyDefinition: TechnologyDefinition = {
	id: 'declarative-shadow-dom-slot-assignment',
	name: 'Declarative Shadow DOM slot assignment',
	website: 'https://developer.chrome.com/blog/new-in-chrome-151#declarative_shadow_dom_shadowrootslotassignment_attribute',
	description:
		'The shadowrootslotassignment attribute lets declarative shadow roots select named or manual slot assignment directly in HTML.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'declarative-shadow-dom-slot-assignment:dom:attribute',
			kind: 'dom',
			selector: 'template[shadowrootmode][shadowrootslotassignment]',
			confidence: 100,
			description: 'Rendered DOM contains a declarative shadow-root template with explicit slot assignment.',
		},
		{
			id: 'declarative-shadow-dom-slot-assignment:html:attribute',
			kind: 'html',
			pattern: /<template(?=[\s>])(?=[^>]*\sshadowrootmode\s*=)(?=[^>]*\sshadowrootslotassignment\s*=\s*(?:"(?:manual|named)"|'(?:manual|named)'|(?:manual|named)(?=[\s/>])))[^>]*>/i,
			confidence: 100,
			description: 'Captured HTML declares named or manual slot assignment on a declarative shadow-root template.',
		},
	],
} as const satisfies TechnologyDefinition;
