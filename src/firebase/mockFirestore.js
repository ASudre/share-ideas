// @flow

import { type Idea } from '../types';

const ideas = [{
  id: '123',
  title: 'test',
  description: 'description test',
  email: 'test@test.fr',
  link: null,
},
{
  id: '456',
  title: 'test 2',
  description: 'description test 2',
  email: 'test2@test.fr',
  link: null,
}];

function addIdea(idea: Idea): Promise<string> {
  console.log('add Idea');
  return Promise.resolve(idea.id);
}

// eslint-disable-next-line
function updateIdea(idea: Idea): Promise<void> {
  console.log('update Idea');
  return Promise.resolve();
}

// eslint-disable-next-line
function deleteIdea(idea: Idea): Promise<void> {
  console.log('delete Idea');
  return Promise.resolve();
}

function getIdeaById(ideaId: string): Promise<Idea | null> {
  console.log('get Idea :', ideaId);
  const idea = ideas.find(i => i.id === ideaId);
  if (!idea) {
    return Promise.resolve(null);
  }
  return Promise.resolve(idea);
}

function getIdeas(): Promise<Idea[]> {
  console.log('get Ideas');
  return Promise.resolve(ideas);
}

export { getIdeas, getIdeaById, addIdea, updateIdea, deleteIdea };
