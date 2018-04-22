// @flow

import {
  requestIdeas,
  receiveIdeas,
  requestIdea,
  receiveIdea,
  requestIdeaCreate,
  receiveIdeaCreate,
  requestIdeaUpdate,
  receiveIdeaUpdate,
  requestIdeaDelete,
  receiveIdeaDelete,
} from '../actions/ideas.actions';
import {
  getIdeas as getIdeasFromDB,
  getIdeaById as getIdeaFromDB,
  updateIdea as updateIdeaFromDB,
  deleteIdea as deleteIdeaFromDB,
  addIdea,
} from '../firebase/firestore';

import { type Idea } from '../types';

function buildIdeasMap(ideas: Idea[]): {[string]: Idea} {
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

export function getIdea(ideaId: string) {
  return async (dispatch: any) => {
    dispatch(requestIdea());
    const idea = await getIdeaFromDB(ideaId);
    dispatch(receiveIdea(idea));
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
