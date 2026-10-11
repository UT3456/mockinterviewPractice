import {execFileSync} from 'node:child_process';
for(const file of ['public/app.js','public/voice.js','api/groq.js','server.mjs'])execFileSync(process.execPath,['--check',file]);
console.log('Application syntax checks passed.');
