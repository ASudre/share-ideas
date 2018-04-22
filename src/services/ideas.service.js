// @flow

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

import { type Idea } from '../types';

function buildIdeasMap(ideas) {
  return ideas.reduce((acc, idea) => ({
    ...acc,
    [idea.id]: idea,
  }), {});
}

export function getIdeas() {
  return async (dispatch: any) => {
    dispatch(requestIdeas());
    const ideas = await getIdeasFromDB();
    dispatch(receiveIdeas(buildIdeasMap(ideas)));
  };
}

export function createIdea(idea: Idea) {
  return async (dispatch: any) => {
    dispatch(requestIdeaCreate(idea));
    const ideaId = await addIdea(idea);
    dispatch(receiveIdeaCreate({
      ...idea,
      id: ideaId,
    }));
  };
}

export function updateIdea(idea: Idea) {
  return async (dispatch: any) => {
    dispatch(requestIdeaUpdate(idea));
    await updateIdeaFromDB(idea);
    dispatch(receiveIdeaUpdate(idea));
  };
}

export function deleteIdea(idea: Idea) {
  return async (dispatch: any) => {
    dispatch(requestIdeaDelete(idea));
    await deleteIdeaFromDB(idea);
    dispatch(receiveIdeaDelete(idea));
  };
}
