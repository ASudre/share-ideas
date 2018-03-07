import { RECEIVE_IDEAS, RECEIVE_IDEA_UPDATE, REQUEST_IDEA_UPDATE } from '../actions/ideas.actions';

export default function(state = { ideas: [] }, action) {
  switch (action.type) {
    case RECEIVE_IDEAS:
      return {
        ideas: action.ideas,
      };
    case REQUEST_IDEA_UPDATE:
      return {
        ...state,
        isUpdating: true,
      };
    case RECEIVE_IDEA_UPDATE:
      return {
        ...state,
        isUpdating: false,
      };
    default:
      return state;
  }
}
