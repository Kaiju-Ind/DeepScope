import type { TechnologyDefinition } from '@/lib/detection/types';
import { amplifyJsTechnologyDefinition } from './amplify-js';
import { animeJsTechnologyDefinition } from './anime-js';
import { apiSpreadsheetsTechnologyDefinition } from './api-spreadsheets';
import { apiaryTechnologyDefinition } from './apiary';
import { bowserTechnologyDefinition } from './bowser';
import { connectionAllowlistsTechnologyDefinition } from './connection-allowlists';
import { customizableSelectTechnologyDefinition } from './customizable-select';
import { declarativeShadowDomSlotAssignmentTechnologyDefinition } from './declarative-shadow-dom-slot-assignment';
import { dialogClosedbyTechnologyDefinition } from './dialog-closedby';
import { dimpleTechnologyDefinition } from './dimple';
import { facilitatedPaymentTechnologyDefinition } from './facilitated-payment';
import { feednamiTechnologyDefinition } from './feednami';
import { fixerTechnologyDefinition } from './fixer';
import { frescoTechnologyDefinition } from './fresco';
import { genezioTechnologyDefinition } from './genezio';
import { hexiaTechnologyDefinition } from './hexia';
import { howlerJsTechnologyDefinition } from './howler-js';
import { htmxTechnologyDefinition } from './htmx';
import { intersectionObserverTechnologyDefinition } from './intersection-observer';
import { invokerCommandsTechnologyDefinition } from './invoker-commands';
import { kurocoTechnologyDefinition } from './kuroco';
import { moxieTechnologyDefinition } from './moxie';
import { pluploadTechnologyDefinition } from './plupload';
import { riotJsTechnologyDefinition } from './riot-js';
import { scalarTechnologyDefinition } from './scalar';
import { screenfullJsTechnologyDefinition } from './screenfull-js';
import { sheetyTechnologyDefinition } from './sheety';
import { sockjsTechnologyDefinition } from './sockjs';
import { usermediaElementTechnologyDefinition } from './usermedia-element';
import { x402TechnologyDefinition } from './x402';
import { apolloGraphqlTechnologyDefinition } from './apollo-graphql';
import { graphqlTechnologyDefinition } from './graphql';
import { relayTechnologyDefinition } from './relay';
import { urqlTechnologyDefinition } from './urql';
import { serverSentEventsTechnologyDefinition } from './server-sent-events';
import { trpcTechnologyDefinition } from './trpc';
import { websocketTechnologyDefinition } from './websocket';

/** Technology definitions in the api pattern category folder. */
export const apiPatternTechnologyDefinitions = [
	amplifyJsTechnologyDefinition,
	animeJsTechnologyDefinition,
	apiSpreadsheetsTechnologyDefinition,
	apiaryTechnologyDefinition,
	bowserTechnologyDefinition,
	connectionAllowlistsTechnologyDefinition,
	customizableSelectTechnologyDefinition,
	declarativeShadowDomSlotAssignmentTechnologyDefinition,
	dialogClosedbyTechnologyDefinition,
	dimpleTechnologyDefinition,
	facilitatedPaymentTechnologyDefinition,
	feednamiTechnologyDefinition,
	fixerTechnologyDefinition,
	frescoTechnologyDefinition,
	genezioTechnologyDefinition,
	hexiaTechnologyDefinition,
	howlerJsTechnologyDefinition,
	htmxTechnologyDefinition,
	intersectionObserverTechnologyDefinition,
	invokerCommandsTechnologyDefinition,
	kurocoTechnologyDefinition,
	moxieTechnologyDefinition,
	pluploadTechnologyDefinition,
	riotJsTechnologyDefinition,
	scalarTechnologyDefinition,
	screenfullJsTechnologyDefinition,
	sheetyTechnologyDefinition,
	sockjsTechnologyDefinition,
	usermediaElementTechnologyDefinition,
	x402TechnologyDefinition,
	apolloGraphqlTechnologyDefinition,
	graphqlTechnologyDefinition,
	relayTechnologyDefinition,
	urqlTechnologyDefinition,
	serverSentEventsTechnologyDefinition,
	trpcTechnologyDefinition,
	websocketTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
