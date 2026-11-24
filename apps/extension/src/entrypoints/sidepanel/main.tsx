import { mountPanel } from '@/app/mount';

import '@/styles/app.css';
import '@/styles/panel.css';

// Chromium loads this page as the side panel; Firefox loads it as the sidebar.
mountPanel({ surface: 'sidepanel' });
