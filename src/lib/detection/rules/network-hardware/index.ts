import type { TechnologyDefinition } from '../../types';
import { amazonEfsTechnologyDefinition } from './amazon-efs';
import { ateraTechnologyDefinition } from './atera';
import { cardinaTechnologyDefinition } from './cardina';
import { cargoserverTechnologyDefinition } from './cargoserver';
import { chaserTechnologyDefinition } from './chaser';
import { citrixTechnologyDefinition } from './citrix';
import { glanceTechnologyDefinition } from './glance';
import { imperoTechnologyDefinition } from './impero';
import { ipfsTechnologyDefinition } from './ipfs';
import { logmeinTechnologyDefinition } from './logmein';
import { maptrackTechnologyDefinition } from './maptrack';
import { milvusTechnologyDefinition } from './milvus';
import { netopTechnologyDefinition } from './netop';
import { paesslerTechnologyDefinition } from './paessler';
import { paloAltoNetworksGlobalprotectTechnologyDefinition } from './palo-alto-networks-globalprotect';
import { pulseSecureTechnologyDefinition } from './pulse-secure';
import { redHatGlusterTechnologyDefinition } from './red-hat-gluster';
import { sednaSystemTechnologyDefinition } from './sedna-system';
import { shellinaboxTechnologyDefinition } from './shellinabox';
import { synologyDiskstationTechnologyDefinition } from './synology-diskstation';
import { teamviewerTechnologyDefinition } from './teamviewer';
import { upscopeTechnologyDefinition } from './upscope';
import { voetbalassistTechnologyDefinition } from './voetbalassist';

export const networkHardwareTechnologyDefinitions = [
	amazonEfsTechnologyDefinition,
	ateraTechnologyDefinition,
	cardinaTechnologyDefinition,
	cargoserverTechnologyDefinition,
	chaserTechnologyDefinition,
	citrixTechnologyDefinition,
	glanceTechnologyDefinition,
	imperoTechnologyDefinition,
	ipfsTechnologyDefinition,
	logmeinTechnologyDefinition,
	maptrackTechnologyDefinition,
	milvusTechnologyDefinition,
	netopTechnologyDefinition,
	paesslerTechnologyDefinition,
	paloAltoNetworksGlobalprotectTechnologyDefinition,
	pulseSecureTechnologyDefinition,
	redHatGlusterTechnologyDefinition,
	sednaSystemTechnologyDefinition,
	shellinaboxTechnologyDefinition,
	synologyDiskstationTechnologyDefinition,
	teamviewerTechnologyDefinition,
	upscopeTechnologyDefinition,
	voetbalassistTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
