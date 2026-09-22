/**
 * Generates src/data/skill-icons.js from simple-icons plus a hand-drawn glyph set.
 *
 * simple-icons is a devDependency and the OUTPUT IS COMMITTED, so a clean
 * `npm ci && npm run build` (and the gh-pages deploy) never needs the package.
 * Re-run with `node scripts/build-icons.mjs` only when the skill list changes.
 *
 * Brand marks are fill paths. Concept glyphs are stroke paths. SkillIcon.jsx
 * picks the render mode from which table the key came out of, so the two never
 * get mixed up (a stroke path rendered as fill is an unreadable blob).
 */
import { writeFileSync } from 'node:fs'
import * as si from 'simple-icons'

/* Concept marks for the ~40 entries that are ideas, not products. Drawn in one
   language: 24x24, stroke, round caps and joins, no fill. Reused across related
   skills on purpose, so the set reads as a taxonomy rather than a shortfall. */
const GLYPHS = {
  flow:     'M3 4.5h5.5v4H3zM15.5 4.5H21v4h-5.5zM9.25 15.5h5.5v4h-5.5zM8.5 6.5h7M5.75 8.5v3a2 2 0 002 2h1.5M18.25 8.5v3a2 2 0 01-2 2h-1.5',
  search:   'M11 4a7 7 0 100 14 7 7 0 000-14zM16.2 16.2L20.5 20.5',
  flask:    'M9 3h6M10 3v6.2L5.2 18.6A1.6 1.6 0 006.6 21h10.8a1.6 1.6 0 001.4-2.4L14 9.2V3M7.6 14.5h8.8',
  shield:   'M12 3l7.5 3v5.2c0 4.6-3.1 8.3-7.5 10.3-4.4-2-7.5-5.7-7.5-10.3V6z',
  gauge:    'M4 17.5a8 8 0 1116 0M12 17.5l4.6-5.2',
  sliders:  'M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1M13 5v4M7 10v4M15 15v4',
  vector:   'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9',
  terminal: 'M3 5h18v14H3zM7 10.2l2.8 2-2.8 2M12.8 14.2H17',
  stream:   'M3 7.2c3-2.2 6 2.2 9 0s6-2.2 9 0M3 12c3-2.2 6 2.2 9 0s6-2.2 9 0M3 16.8c3-2.2 6 2.2 9 0s6-2.2 9 0',
  map:      'M9 3.5L3 6v14.5L9 18l6 2.5 6-2.5V3.5L15 6zM9 3.5V18M15 6v14.5',
  tree:     'M12 3.5v4M8 7.5h8M8 7.5v3M16 7.5v3M5.5 10.5h5M13.5 10.5h5M5.5 10.5v3M10.5 10.5v3M13.5 10.5v3M18.5 10.5v3',
  network:  'M5 6h.01M5 12h.01M5 18h.01M12.5 8.5h.01M12.5 15.5h.01M20 12h.01M5.6 6.6l6.3 1.7M5.6 11.4l6.3-2.5M5.6 12.6l6.3 2.5M5.6 17.4l6.3-1.7M13.1 9.1l6.3 2.4M13.1 14.9l6.3-2.4',
  sigma:    'M18 4.5H6l7.2 7.5L6 19.5h12',
  cloud:    'M7.2 18.5h9.6a4.2 4.2 0 00.3-8.4 6.2 6.2 0 00-11.9 1.6 3.6 3.6 0 002 6.8z',
  chart:    'M4 20V4M4 20h16M8.2 17v-4.8M12.4 17V8.4M16.6 17V10',
  table:    'M3 5h18v14H3zM3 10h18M9 10v9M15 10v9',
  scatter:  'M4 20V4M4 20h16M8.2 15.2h.01M11.4 10.8h.01M14.6 13.4h.01M17.8 7.8h.01M9.8 17.4h.01M15.4 16h.01',
}

/* Explicit skill -> icon key. Never fuzzy-matched: "R" would substring-match
   almost every entry, and a silent mismatch ships a wrong logo. */
const ICON_FOR = {
  // LLM and Agents
  'LangGraph (ReAct, multi-agent)': 'g:flow',
  'LangChain': 'b:langchain',
  'Model Context Protocol (MCP)': 'g:flow',
  'LLM tool-calling agents': 'g:flow',
  'RAG (BM25, embeddings, hybrid)': 'g:search',
  'LiteLLM multi-provider gateway': 'g:flow',
  'OpenAI-compatible APIs': 'b:openapiinitiative',
  'OpenAI / Anthropic / Gemini APIs': 'b:anthropic',
  'Ollama': 'b:ollama',
  'Pydantic v2 structured outputs': 'b:pydantic',
  'LLM evaluation harnesses': 'g:flask',
  'prompt-injection testing': 'g:shield',
  'guardrails': 'g:shield',
  'Langfuse tracing': 'g:gauge',
  'QLoRA / LoRA fine-tuning (PEFT)': 'g:sliders',
  'Pinecone': 'g:vector',
  'ChromaDB': 'g:vector',
  'FAISS': 'g:vector',
  'agentic coding tools (Claude Code, Cursor)': 'g:terminal',

  // Languages
  'Python': 'b:python',
  'TypeScript': 'b:typescript',
  'R': 'b:r',
  'SQL (PostgreSQL, MySQL)': 'b:postgresql',
  'Bash': 'b:gnubash',
  'JavaScript': 'b:javascript',

  // Backend and Data
  'FastAPI': 'b:fastapi',
  'REST APIs': 'b:swagger',
  'Server-Sent Events (SSE)': 'g:stream',
  'PostgreSQL + Alembic': 'b:postgresql',
  'SQLite / sqlite-vec': 'b:sqlite',
  'PostGIS': 'g:map',
  'MongoDB': 'b:mongodb',
  'Databricks (Unity Catalog, Unity AI Gateway, Model Serving, Genie, AI Functions)': 'b:databricks',
  'Iceberg / Parquet CDC via Debezium': 'b:apacheparquet',
  'Temporal': 'b:temporal',
  'Docker': 'b:docker',
  'Kubernetes / Kustomize': 'b:kubernetes',
  'Kubernetes HPA': 'b:kubernetes',
  'ArgoCD': 'b:argo',
  'GitLab CI/CD': 'b:gitlab',
  'GitHub Actions': 'b:githubactions',
  'pytest': 'b:pytest',

  // Machine Learning
  'scikit-learn': 'b:scikitlearn',
  'XGBoost': 'g:tree',
  'LightGBM': 'g:tree',
  'Random Forest': 'g:tree',
  'GBRT': 'g:tree',
  'SVR': 'g:scatter',
  'MLP': 'g:network',
  'TensorFlow': 'b:tensorflow',
  'Keras': 'b:keras',
  'PyTorch': 'b:pytorch',
  'CNN-LSTM': 'g:network',
  'custom loss functions (CRPS)': 'g:sigma',
  'MLflow': 'b:mlflow',
  'hyperparameter tuning': 'g:sliders',
  'cross-validation': 'g:sigma',
  'controlled ablations': 'g:flask',
  'mutation testing': 'g:flask',

  // Frontend, Cloud and Observability
  'React': 'b:react',
  'Next.js': 'b:nextdotjs',
  'Vite': 'b:vite',
  'Tailwind CSS': 'b:tailwindcss',
  'Azure (AKS, ACR, Entra ID, Blob)': 'g:cloud',
  'AWS (Lambda, S3, EC2, API Gateway, RDS, Secrets Manager)': 'g:cloud',
  'OIDC auth (oauth2-proxy, Keycloak)': 'b:keycloak',
  'Grafana': 'b:grafana',
  'Loki': 'g:stream',
  'Prometheus': 'b:prometheus',
  'Locust load testing': 'b:locust',

  // Visualization and BI
  'Tableau': 'g:chart',
  'Power BI': 'g:chart',
  'Excel': 'g:table',
  'Matplotlib': 'g:chart',
  'Plotly': 'b:plotly',
  'Seaborn': 'g:chart',
}

const slugToExport = (s) => 'si' + s.charAt(0).toUpperCase() + s.slice(1)

const brands = {}
const missing = []
const usedGlyphs = new Set()

for (const [skill, key] of Object.entries(ICON_FOR)) {
  const [kind, name] = key.split(':')
  if (kind === 'b') {
    const icon = si[slugToExport(name)]
    if (!icon) { missing.push(`${skill} -> ${name}`); continue }
    brands[name] = icon.path
  } else {
    if (!GLYPHS[name]) { missing.push(`${skill} -> glyph ${name} UNDEFINED`); continue }
    usedGlyphs.add(name)
  }
}

if (missing.length) {
  console.error('UNRESOLVED:\n  ' + missing.join('\n  '))
  process.exit(1)
}

const unusedGlyphs = Object.keys(GLYPHS).filter((g) => !usedGlyphs.has(g))
const out = `// GENERATED by scripts/build-icons.mjs. Do not edit by hand.
// Brand marks from simple-icons (CC0), rendered as fill paths.
// Concept glyphs hand-drawn, rendered as stroke paths.
export const BRANDS = ${JSON.stringify(brands, null, 2)}

export const GLYPHS = ${JSON.stringify(Object.fromEntries(Object.entries(GLYPHS).filter(([g]) => usedGlyphs.has(g))), null, 2)}

export const ICON_FOR = ${JSON.stringify(ICON_FOR, null, 2)}
`
writeFileSync(new URL('../src/data/skill-icons.js', import.meta.url), out)

console.log(`skills mapped : ${Object.keys(ICON_FOR).length}`)
console.log(`brand marks   : ${Object.keys(brands).length}`)
console.log(`glyphs used   : ${usedGlyphs.size}${unusedGlyphs.length ? ` (unused: ${unusedGlyphs.join(', ')})` : ''}`)
console.log(`bytes         : ${out.length}`)
