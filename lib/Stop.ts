import * as fkill from 'fkill';

import { getProcessId, setProcessId } from './Process';

const stopApp = async () => {

    const pid = await getProcessId();
    if (pid == null) return;
    await fkill(pid);

    await setProcessId(null);

};

stopApp();