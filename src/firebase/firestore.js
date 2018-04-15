import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDvgQaGMBum1jTwLYzU4qwjZUNJaRgR9mA',
  authDomain: 'mythic-hulling-163311.firebaseapp.com',
  databaseURL: 'https://mythic-hulling-163311.firebaseio.com',
  projectId: 'mythic-hulling-163311',
  storageBucket: 'mythic-hulling-163311.appspot.com',
  messagingSenderId: '891582917788'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addIdea(idea) {
  return db.collection('ideas').add(idea)
  .then(function(docRef) {
    return docRef.id;
  })
  .catch(function(error) {
    console.error('Error adding document: ', error);
  });
}

function updateIdea(idea) {
  return db.collection('ideas').doc(idea.id).update(idea)
  .then(function(docRef) {
    console.log('Document updated with ID: ', idea.id);
  })
  .catch(function(error) {
    console.error('Error updating document: ', error);
  });
}

function deleteIdea(idea) {
  return db.collection('ideas').doc(idea.id).delete()
  .then(function(docRef) {
    console.log('Document deleted with ID: ', idea.id);
  })
  .catch(function(error) {
    console.error('Error deleting document: ', error);
  });
}

function getIdeaById(ideaId) {
  return db.collection('ideas').doc(ideaId).get()
  .then(doc => {
    if (doc.exists) {
      return {
        ...doc.data(),
        id: doc.id,
      };
    } else {
      console.log("No such document!");
    }
  })
  .catch(function(error) {
    console.error('Error adding document: ', error);
  });
}

function getIdeas() {
  return db.collection('ideas')
  .get()
  .then(querySnapshot => {
    let ideas = [];
    querySnapshot.forEach(doc => {
      ideas = [...ideas, {
        ...doc.data(),
        id: doc.id,
      }];
    });
    return ideas;
  })
  .catch(e => {
    console.log(e);
  });
}

export {
  getIdeas,
  getIdeaById,
  addIdea,
  updateIdea,
  deleteIdea,
}
