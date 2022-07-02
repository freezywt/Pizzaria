#!/usr/bin/env node

const { program } = require('./build');

program.parseAsync(process.argv);
