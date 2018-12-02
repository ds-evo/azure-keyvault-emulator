import { help } from './HelpCommands';
import { setProcessName } from '../Process';
import { tryHelpCommands } from './HelpCommands';
import { tryRunnerCommands } from './RunnerCommands';
import { tryServiceCommands } from './ServiceCommands';

(async () => {

    setProcessName();
    const command = process.argv[2];

    if (!tryHelpCommands(command)) return;
    if (!await tryServiceCommands(command)) return;
    if (!await tryRunnerCommands(command)) return;

    return await help();
})();