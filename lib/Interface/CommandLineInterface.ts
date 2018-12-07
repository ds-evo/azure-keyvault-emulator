#!/usr/bin/env node

import { setProcessName } from '../Process';
import { tryHelpCommands, help } from './HelpCommands';
import { tryRunnerCommands } from './RunnerCommands';
import { tryListenerCommands } from './SubscribtionCommands';

/**
 * Handle the string coming in from the cli call
 */
const handleCliCommand = async () => {

    // Make the process recognizable
    setProcessName();
    const command = process.argv[2];

    // Try whether or not the command exists (I know it's not a nice solution but it works)
    if (!await tryHelpCommands(command)) return;
    if (!await tryListenerCommands(command)) return;
    if (!await tryRunnerCommands(command)) return;

    return await help();
};

handleCliCommand();