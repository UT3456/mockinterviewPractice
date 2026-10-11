const MODELS = new Set(['openai/gpt-oss-20b', 'openai/gpt-oss-120b', 'qwen/qwen3.8-27b']);
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({error:'Use POST.'});
  const key = String(req.headers.authorization || '').replace(/^Bearer /, '');
  if (!/^gsk_[a-zA-Z0-9_-]{10,200}$/.test(key)) return res.status(401).json({error:'Enter your Groq API key in AI setup. It is used only for this session.'});
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || !MODELS.has(body.model) || !Array.isArray(body.messages) || body.messages.length>24 || body.messages.some(m=>!['system','user','assistant'].includes(m.role)||typeof m.content!=='string'||m.content.length>16000)) return res.status(400).json({error:'Invalid interview request.'});
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:body.model,messages:body.messages,temperature:0.6,max_completion_tokens:1100}),signal:AbortSignal.timeout(50000)});
    if (!upstream.ok) return res.status(upstream.status===429?429:502).json({error:upstream.status===429?'Groq free-tier limit reached. Wait and retry, or switch to local Ollama.':upstream.status===401?'Groq rejected this API key. Check AI setup.':'Groq could not complete the request. Check your model access and try again.'});
    const data=await upstream.json();return res.status(200).json({text:data.choices?.[0]?.message?.content||''});
  } catch(e) { return res.status(502).json({error:e.name==='TimeoutError'?'The model took too long. Try again.':'Unable to connect to Groq. Your answer has been kept.'}); }
}
