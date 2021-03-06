// @flow

import { type State, type Actions } from './../types';

export default function (
  state: State = {
    ideas: {},
    idea: null,
    loadingIdea: false,
    savingIdea: true,
    loadingIdeas: false,
    deletingIdea: false,
  },
  action: Actions,
): State {
  switch (action.type) {
    case 'REQUEST_IDEAS':
      return {
        ...state,
        loadingIdeas: true,
      };
    case 'RECEIVE_IDEAS':
      return {
        ...state,
        ideas: action.ideas,
        loadingIdeas: false,
      };
    case 'REQUEST_IDEA':
      return {
        ...state,
        loadingIdea: true,
      };
    case 'RECEIVE_IDEA':
      return {
        ...state,
        idea: action.idea,
        loadingIdea: false,
      };
    case 'REQUEST_IDEA_UPDATE':
    case 'REQUEST_IDEA_CREATE':
      return {
        ...state,
        savingIdea: true,
      };
    case 'RECEIVE_IDEA_UPDATE':
    case 'RECEIVE_IDEA_CREATE':
      return {
        ...state,
        idea: action.idea,
        ideas: {
          ...state.ideas,
          [action.idea.id]: action.idea,
        },
        savingIdea: false,
      };
    case 'REQUEST_IDEA_DELETE':
      return {
        ...state,
        deletingIdea: true,
      };
    case 'RECEIVE_IDEA_DELETE': {
      const newIdeas = { ...state.ideas };
      delete newIdeas[action.idea.id];
      return {
        ...state,
        ideas: newIdeas,
        deletingIdea: false,
      };
    }
    default:
      return state;
  }
}
