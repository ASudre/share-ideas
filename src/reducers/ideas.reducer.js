import {
  REQUEST_IDEAS,
  RECEIVE_IDEAS,
  RECEIVE_IDEA_UPDATE,
  REQUEST_IDEA_UPDATE,
  RECEIVE_IDEA_DELETE,
  REQUEST_IDEA_DELETE,
  RECEIVE_IDEA_CREATE,
  REQUEST_IDEA_CREATE,
} from '../actions/ideas.actions';

export default function (
  state = {
    ideas: {},
    savingIdea: true,
    loadingIdeas: false,
    deletingIdea: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_IDEAS:
      return {
        ...state,
        loadingIdeas: true,
      };
    case RECEIVE_IDEAS:
      return {
        ...state,
        ideas: action.ideas,
        loadingIdeas: false,
      };
    case REQUEST_IDEA_UPDATE:
    case REQUEST_IDEA_CREATE:
      return {
        ...state,
        savingIdea: true,
      };
    case RECEIVE_IDEA_UPDATE:
    case RECEIVE_IDEA_CREATE:
      return {
        ...state,
        ideas: {
          ...state.ideas,
          [action.idea.id]: action.idea,
        },
        savingIdea: false,
      };
    case REQUEST_IDEA_DELETE:
      return {
        ...state,
        deletingIdea: true,
      };
    case RECEIVE_IDEA_DELETE: {
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
