// @flow

import {
  type Idea,
  type RequestIdeas,
  type ReceiveIdeas,
  type RequestIdea,
  type ReceiveIdea,
  type RequestIdeaUpdate,
  type ReceiveIdeaUpdate,
  type RequestIdeaCreate,
  type ReceiveIdeaCreate,
  type RequestIdeaDelete,
  type ReceiveIdeaDelete,
} from '../types';

export function requestIdeas(): RequestIdeas {
  return {
    type: 'REQUEST_IDEAS',
  };
}

export function receiveIdeas(ideas: {[string]: Idea}): ReceiveIdeas {
  return {
    type: 'RECEIVE_IDEAS',
    ideas,
  };
}

export function requestIdea(): RequestIdea {
  return {
    type: 'REQUEST_IDEA',
  };
}

export function receiveIdea(idea: Idea | null): ReceiveIdea {
  return {
    type: 'RECEIVE_IDEA',
    idea,
  };
}

export function requestIdeaUpdate(idea: Idea): RequestIdeaUpdate {
  return {
    type: 'REQUEST_IDEA_UPDATE',
    idea,
  };
}

export function receiveIdeaUpdate(idea: Idea): ReceiveIdeaUpdate {
  return {
    type: 'RECEIVE_IDEA_UPDATE',
    idea,
  };
}

export function requestIdeaDelete(idea: Idea): RequestIdeaDelete {
  return {
    type: 'REQUEST_IDEA_DELETE',
    idea,
  };
}

export function receiveIdeaDelete(idea: Idea): ReceiveIdeaDelete {
  return {
    type: 'RECEIVE_IDEA_DELETE',
    idea,
  };
}

export function requestIdeaCreate(idea: Idea): RequestIdeaCreate {
  return {
    type: 'REQUEST_IDEA_CREATE',
    idea,
  };
}

export function receiveIdeaCreate(idea: Idea): ReceiveIdeaCreate {
  return {
    type: 'RECEIVE_IDEA_CREATE',
    idea,
  };
}
