import {SAVE_MARSHRUT, SAVE_KOLONA, SAVE_GRAPH} from './constants';

const initialState = {
  resultsMarsh: {},
  resultsKolona: {},
  initialGraph: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_MARSHRUT: {
      return {...state, resultsMarsh: action.data};
    }
    case SAVE_KOLONA: {
      return {...state, resultsKolona: action.kolona};
    }
    case SAVE_GRAPH:
      return {...state, initialGraph: action.graph};
    default:
      return state;
  }
}
