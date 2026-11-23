import { mountPanel } from '@/app/mount';
import { policyFromLocation } from '@/app/surface';

import '@/styles/app.css';
import '@/styles/panel.css';

// A full page describes the tab named in its URL, not whichever tab is active.
mountPanel({ surface: 'page', policy: policyFromLocation(globalThis.location.href) });
