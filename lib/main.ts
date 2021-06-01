#!/usr/bin/env node
import { hostHttpServer } from './Server';

// Make the process recognizable
// process['name'] = appName;
// process.title = appName;

hostHttpServer();