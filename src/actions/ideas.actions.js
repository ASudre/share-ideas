export const REQUEST_IDEAS = 'REQUEST_IDEAS';
export const RECEIVE_IDEAS = 'RECEIVE_IDEAS';
export const REQUEST_IDEA_UPDATE = 'REQUEST_IDEA_UPDATE';
export const RECEIVE_IDEA_UPDATE = 'RECEIVE_IDEA_UPDATE';
export const REQUEST_IDEA_CREATE = 'REQUEST_IDEA_CREATE';
export const RECEIVE_IDEA_CREATE = 'RECEIVE_IDEA_CREATE';

export function requestIdeas() {
  return {
    type: REQUEST_IDEAS,
  };
}

export function receiveIdeas(ideas) {
  return {
    type: RECEIVE_IDEAS,
    ideas,
  };
}

export function requestIdeaUpdate(idea) {
  return {
    type: REQUEST_IDEA_UPDATE,
    idea,
  };
}

export function receiveIdeaUpdate(idea) {
  return {
    type: RECEIVE_IDEA_UPDATE,
    idea,
  };
}

export function requestIdeaCreate(idea) {
  return {
    type: REQUEST_IDEA_UPDATE,
    idea,
  };
}

export function receiveIdeaCreate(idea) {
  return {
    type: RECEIVE_IDEA_UPDATE,
    idea,
  };
}
