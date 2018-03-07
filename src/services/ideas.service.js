import { requestIdeas, receiveIdeas, requestIdeaUpdate, receiveIdeaUpdate } from '../actions/ideas.actions';
import { getIdeas as getIdeasFromDB } from '../firebase/firestore';
import { updateIdea as updateIdeaFromDB } from '../firebase/firestore';

export function getIdeas() {
  return async dispatch => {
    dispatch(requestIdeas());
    const ideas = await getIdeasFromDB();
    dispatch(receiveIdeas(ideas));
  };
}

export function updateIdea(idea) {
  return async dispatch => {
    dispatch(requestIdeaUpdate(idea));
    await updateIdeaFromDB(idea);
    dispatch(receiveIdeaUpdate(idea));
  };
}
