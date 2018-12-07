#!/usr/bin/env node

import { start } from '../Emulator';

start()
    .then(() => process.exit(0))
    .catch(err => process.exit(-1));