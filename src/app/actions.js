import {SAVE_MARSHRUT, SAVE_KOLONA, SAVE_GRAPH} from './constants';

export const saveMarshrut = data => ({
  type: SAVE_MARSHRUT,
  data
});

export const saveKolona = kolona => ({
  type: SAVE_KOLONA,
  kolona
});

export const saveGraph = graph => ({
  type: SAVE_GRAPH,
  graph
});
