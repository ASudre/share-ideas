// @flow

import * as firebase from 'firebase';
import 'firebase/firestore';

import { type Config } from './config';
import { type Idea } from '../types';

// Initialize Firebase
const firebaseConfig: Config = {
  apiKey: 'AIzaSyDvgQaGMBum1jTwLYzU4qwjZUNJaRgR9mA',
  authDomain: 'mythic-hulling-163311.firebaseapp.com',
  databaseURL: 'https://mythic-hulling-163311.firebaseio.com',
  projectId: 'mythic-hulling-163311',
  storageBucket: 'mythic-hulling-163311.appspot.com',
  messagingSenderId: '891582917788',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addIdea(idea: Idea): Promise<string> {
  return db
    .collection('ideas')
    .add(idea)
    .then(docRef => docRef.id)
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}

function updateIdea(idea: Idea): Promise<void> {
  return db
    .collection('ideas')
    .doc(idea.id)
    .update(idea)
    .then(() => {
      console.log('Document updated with ID: ', idea.id);
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
}

function deleteIdea(idea: Idea): Promise<void> {
  return db
    .collection('ideas')
    .doc(idea.id)
    .delete()
    .then(() => {
      console.log('Document deleted with ID: ', idea.id);
    })
    .catch((error) => {
      console.error('Error deleting document: ', error);
    });
}

function getIdeaById(ideaId: string): Promise<Idea | null> {
  return db
    .collection('ideas')
    .doc(ideaId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          ...doc.data(),
          id: doc.id,
        };
      }
      console.log('No such document!');
      return null;
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}

function getIdeas(): Promise<Idea[]> {
  return db
    .collection('ideas')
    .get()
    .then((querySnapshot) => {
      let ideas = [];
      querySnapshot.forEach((doc) => {
        ideas = [
          ...ideas,
          {
            ...doc.data(),
            id: doc.id,
          },
        ];
      });
      return ideas;
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
}

export { getIdeas, getIdeaById, addIdea, updateIdea, deleteIdea };
