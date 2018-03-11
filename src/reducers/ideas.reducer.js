import { RECEIVE_IDEAS, RECEIVE_IDEA_UPDATE, REQUEST_IDEA_UPDATE } from '../actions/ideas.actions';

export default function(state = { ideas: {}, saving: true, loading: false }, action) {
  switch (action.type) {
    case RECEIVE_IDEAS:
      return {
        ...state,
        ideas: action.ideas,
      };
    case REQUEST_IDEA_UPDATE:
      return {
        ...state,
        saving: true,
      };
    case RECEIVE_IDEA_UPDATE:
      return {
        ...state,
        ideas: {
          ...state.ideas,
          [action.idea.id]: action.idea,
        },
        saving: false,
      };
    default:
      return state;
  }
}
