/** Preserve validated deep-pack blocks and their original heading indexes. */
export function buildReaderSections(sections) {
 const get=id=>{const section=sections.find(s=>s.id===id);if(!section) throw new Error(`Missing reader section: ${id}`);return {...section,children:[]};};
 const process=get('processes');process.children=[get('equipment')];
 return [get('applications'),process,get('standards'),get('insights')];
}

// Editorial order for reviewed rollout sections; absent content is never published.
export const readerSectionOrder=['identity','effects','components','applications','formulations','processes','standards','faq','insights','patents'];
