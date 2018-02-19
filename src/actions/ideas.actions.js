export const REQUEST_IDEAS = 'REQUEST_IDEAS';
export const RECEIVE_IDEAS = 'RECEIVE_IDEAS';

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
