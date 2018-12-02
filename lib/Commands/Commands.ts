#!/usr/bin/env node

import { setProcessName } from '../Process';
import { tryHelpCommands, help } from './HelpCommands';
import { tryRunnerCommands } from './RunnerCommands';
import { tryServiceCommands } from './ServiceCommands';

/**
 * CLI Handler
 */
(async () => {

    // Make the process recognizable
    setProcessName();
    const command = process.argv[2];

    // Try whether or not the command exists (I know it's not a nice solution but it works)
    if (!await tryHelpCommands(command)) return;
    if (!await tryServiceCommands(command)) return;
    if (!await tryRunnerCommands(command)) return;

    return await help();
})();