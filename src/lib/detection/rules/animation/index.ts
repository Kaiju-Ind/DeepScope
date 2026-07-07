import type { TechnologyDefinition } from '../../types';
import { animateCssTechnologyDefinition } from './animate-css';
import { animeJsTechnologyDefinition } from './anime-js';
import { aosTechnologyDefinition } from './aos';
import { framerMotionTechnologyDefinition } from './framer-motion';
import { gsapTechnologyDefinition } from './gsap';
import { autoanimateTechnologyDefinition } from './autoanimate';
import { lottieTechnologyDefinition } from './lottie';
import { motionOneTechnologyDefinition } from './motion-one';
import { reactSpringTechnologyDefinition } from './react-spring';
import { viewTransitionsApiTechnologyDefinition } from './view-transitions-api';

export const animationTechnologyDefinitions = [
	animateCssTechnologyDefinition,
	animeJsTechnologyDefinition,
	aosTechnologyDefinition,
	framerMotionTechnologyDefinition,
	gsapTechnologyDefinition,
	autoanimateTechnologyDefinition,
	lottieTechnologyDefinition,
	motionOneTechnologyDefinition,
	reactSpringTechnologyDefinition,
	viewTransitionsApiTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
