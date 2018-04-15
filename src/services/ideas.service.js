import {
  requestIdeas,
  receiveIdeas,
  requestIdeaCreate,
  receiveIdeaCreate,
  requestIdeaUpdate,
  receiveIdeaUpdate,
  requestIdeaDelete,
  receiveIdeaDelete,
} from '../actions/ideas.actions';
import {
  getIdeas as getIdeasFromDB,
  updateIdea as updateIdeaFromDB,
  deleteIdea as deleteIdeaFromDB,
  addIdea,
} from '../firebase/firestore';

export function getIdeas() {
  return async dispatch => {
    dispatch(requestIdeas());
    const ideas = await getIdeasFromDB();
    dispatch(receiveIdeas(buildIdeasMap(ideas)));
  };
}

function buildIdeasMap(ideas) {
  return ideas.reduce((acc, idea) => {
    return {
      ...acc,
      [idea.id]: idea,
    };
  }, {});
}

export function createIdea(idea) {
  return async dispatch => {
    dispatch(requestIdeaCreate(idea));
    const ideaId = await addIdea(idea);
    dispatch(receiveIdeaCreate({
      ...idea,
      id: ideaId,
    }));
  };
}

export function updateIdea(idea) {
  return async dispatch => {
    dispatch(requestIdeaUpdate(idea));
    await updateIdeaFromDB(idea);
    dispatch(receiveIdeaUpdate(idea));
  };
}

export function deleteIdea(idea) {
  return async dispatch => {
    dispatch(requestIdeaDelete(idea));
    await deleteIdeaFromDB(idea);
    dispatch(receiveIdeaDelete(idea));
  };
}
