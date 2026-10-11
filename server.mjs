import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import handler from './api/groq.js';
const root=path.resolve('public');
http.createServer(async(req,res)=>{
  if(req.url==='/api/groq') {
    let body='';for await (const chunk of req){body+=chunk;if(body.length>220000){res.writeHead(413).end();return}}
    try{req.body=JSON.parse(body)}catch{res.writeHead(400).end();return}
    res.status=n=>{res.statusCode=n;return res};res.json=data=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data))};return handler(req,res);
  }
  try{const p=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return}const data=await readFile(p);res.setHeader('Content-Type',p.endsWith('.js')?'application/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(data)}catch{res.writeHead(404).end('Not found')}
}).listen(4173,'127.0.0.1',()=>console.log('Interviewly: http://127.0.0.1:4173'));
