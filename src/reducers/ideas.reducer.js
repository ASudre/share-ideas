import {
  REQUEST_IDEAS,
  RECEIVE_IDEAS,
  RECEIVE_IDEA_UPDATE,
  REQUEST_IDEA_UPDATE,
  RECEIVE_IDEA_CREATE,
  REQUEST_IDEA_CREATE,
} from '../actions/ideas.actions';

export default function(
  state = { ideas: {}, saving: true, loading: false },
  action
) {
  switch (action.type) {
    case REQUEST_IDEAS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_IDEAS:
      return {
        ...state,
        ideas: action.ideas,
        loading: false,
      };
    case REQUEST_IDEA_UPDATE:
    case REQUEST_IDEA_CREATE:
      return {
        ...state,
        saving: true,
      };
    case RECEIVE_IDEA_UPDATE:
    case RECEIVE_IDEA_CREATE:
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
