import RECEIVE_IDEAS from '../actions/ideas.actions';

export default function(state = { ideas: [] }, action) {
  switch (action) {
    case RECEIVE_IDEAS:
      return action.ideas;
    default:
      return state;
  }
}
