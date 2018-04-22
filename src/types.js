// @flow

export type Idea = {
  id: string,
  title: string,
  description: string,
  email: string,
  link: string | null,
}

export type State = {|
  ideas: {[string]: Idea},
  idea: Idea | null,
  loadingIdea: boolean;
  savingIdea: boolean,
  loadingIdeas: boolean,
  deletingIdea: boolean,
|}

export type RequestIdeas = {
  type: 'REQUEST_IDEAS',
};
export type ReceiveIdeas = {
  type: 'RECEIVE_IDEAS',
  ideas: {[string]: Idea},
};
export type RequestIdea = {
  type: 'REQUEST_IDEA',
};
export type ReceiveIdea = {
  type: 'RECEIVE_IDEA',
  idea: Idea | null,
};
export type RequestIdeaUpdate = {
  type: 'REQUEST_IDEA_UPDATE',
  idea: Idea,
};
export type ReceiveIdeaUpdate = {
  type: 'RECEIVE_IDEA_UPDATE',
  idea: Idea,
};
export type RequestIdeaCreate = {
  type: 'REQUEST_IDEA_CREATE',
  idea: Idea,
};
export type ReceiveIdeaCreate = {
  type: 'RECEIVE_IDEA_CREATE',
  idea: Idea,
};
export type RequestIdeaDelete = {
  type: 'REQUEST_IDEA_DELETE',
  idea: Idea,
};
export type ReceiveIdeaDelete = {
  type: 'RECEIVE_IDEA_DELETE',
  idea: Idea,
};

export type Actions =
  | RequestIdeas
  | ReceiveIdeas
  | RequestIdea
  | ReceiveIdea
  | RequestIdeaUpdate
  | ReceiveIdeaUpdate
  | RequestIdeaCreate
  | ReceiveIdeaCreate
  | RequestIdeaDelete
  | ReceiveIdeaDelete;
