'use babel'

const inputSamples = [
  {
    type: "BibTeX",
    value: `@article{article,
  author  = {Peter Adams}, 
  title   = {The title of the work},
  journal = {The name of the journal},
  year    = 1993,
  number  = 2,
  pages   = {201-213},
  month   = 7,
  note    = {An optional note}, 
  volume  = 4
}`
  },
  {
    type: "BibJSON",
    value: `{
  "title": "Open Bibliography for Science, Technology and Medicine",
  "author":[
      {"name": "Richard Jones"},
      {"name": "Mark MacGillivray"},
      {"name": "Peter Murray-Rust"},
      {"name": "Jim Pitman"},
      {"name": "Peter Sefton"},
      {"name": "Ben O'Steen"},
      {"name": "William Waites"}
  ],
  "type": "article",
  "year": "2011",
  "journal": {"name": "Journal of Cheminformatics"},
  "link": [{"url":"http://www.jcheminf.com/content/3/1/47"}],
  "identifier": [{"type":"doi","id":"10.1186/1758-2946-3-47"}]
}`
  },
  {
    type: "CSL-JSON",
    value: `{
  "container-title": "PeerJ Computer Science",
  "author": [
    {
      "given": "Lars G.",
      "family": "Willighagen"
    }
  ],
  "DOI": "10.7717/peerj-cs.214",
  "type": "article-journal",
  "id": "Willighagen_2019_Citation",
  "citation-label": "Willighagen_2019_Citation",
  "ISSN": "2376-5992",
  "issued": {
    "date-parts": [
      [
        2019,
        8
      ]
    ]
  },
  "keyword": "Bibliography,Javascript",
  "page": "e214",
  "title": "Citation.js: a format-independent, modular bibliography tool for the browser and command line",
  "URL": "https://doi.org/10.7717/peerj-cs.214",
  "volume": 5
}`
  },
  {
    type: "RIS",
    value: `TY  - JOUR
AU  - Willighagen, Lars G.
DA  - 2019/8//
DO  - 10.7717/peerj-cs.214
ID  - Willighagen_2019_Cit
KW  - Bibliography
KW  - Javascript
LB  - Willighagen_2019_Citation
SN  - 2376-5992
SP  - e214
T2  - PeerJ Computer Science
TI  - Citation.js: a format-independent, modular bibliography tool for the b
rowser and command line
UR  - https://doi.org/10.7717/peerj-cs.214
VL  - 5
ER  - `
  }
]

export default inputSamples;
