import type { TechnologyDefinition } from '../../types';
import { amplifyJsTechnologyDefinition } from './amplify-js';
import { animeJsTechnologyDefinition } from './anime-js';
import { apiSpreadsheetsTechnologyDefinition } from './api-spreadsheets';
import { apiaryTechnologyDefinition } from './apiary';
import { bowserTechnologyDefinition } from './bowser';
import { dimpleTechnologyDefinition } from './dimple';
import { feednamiTechnologyDefinition } from './feednami';
import { fixerTechnologyDefinition } from './fixer';
import { frescoTechnologyDefinition } from './fresco';
import { genezioTechnologyDefinition } from './genezio';
import { hexiaTechnologyDefinition } from './hexia';
import { howlerJsTechnologyDefinition } from './howler-js';
import { htmxTechnologyDefinition } from './htmx';
import { intersectionObserverTechnologyDefinition } from './intersection-observer';
import { kurocoTechnologyDefinition } from './kuroco';
import { moxieTechnologyDefinition } from './moxie';
import { pluploadTechnologyDefinition } from './plupload';
import { riotJsTechnologyDefinition } from './riot-js';
import { scalarTechnologyDefinition } from './scalar';
import { screenfullJsTechnologyDefinition } from './screenfull-js';
import { sheetyTechnologyDefinition } from './sheety';
import { sockjsTechnologyDefinition } from './sockjs';
import { apolloGraphqlTechnologyDefinition } from './apollo-graphql';
import { graphqlTechnologyDefinition } from './graphql';
import { relayTechnologyDefinition } from './relay';
import { urqlTechnologyDefinition } from './urql';
import { serverSentEventsTechnologyDefinition } from './server-sent-events';
import { trpcTechnologyDefinition } from './trpc';
import { websocketTechnologyDefinition } from './websocket';

export const apiPatternTechnologyDefinitions = [
	amplifyJsTechnologyDefinition,
	animeJsTechnologyDefinition,
	apiSpreadsheetsTechnologyDefinition,
	apiaryTechnologyDefinition,
	bowserTechnologyDefinition,
	dimpleTechnologyDefinition,
	feednamiTechnologyDefinition,
	fixerTechnologyDefinition,
	frescoTechnologyDefinition,
	genezioTechnologyDefinition,
	hexiaTechnologyDefinition,
	howlerJsTechnologyDefinition,
	htmxTechnologyDefinition,
	intersectionObserverTechnologyDefinition,
	kurocoTechnologyDefinition,
	moxieTechnologyDefinition,
	pluploadTechnologyDefinition,
	riotJsTechnologyDefinition,
	scalarTechnologyDefinition,
	screenfullJsTechnologyDefinition,
	sheetyTechnologyDefinition,
	sockjsTechnologyDefinition,
	apolloGraphqlTechnologyDefinition,
	graphqlTechnologyDefinition,
	relayTechnologyDefinition,
	urqlTechnologyDefinition,
	serverSentEventsTechnologyDefinition,
	trpcTechnologyDefinition,
	websocketTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
