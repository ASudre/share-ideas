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
  db.collection('ideas').add(idea)
  .then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch(function(error) {
    console.error('Error adding document: ', error);
  });
}

function updateIdea(id, idea) {
  db.collection('ideas').doc(id).update(idea)
  .then(function() {
    console.log('Document written with ID: ', id);
  })
  .catch(function(error) {
    console.error('Error adding document: ', error);
  });
}


function getIdeaById(ideaId) {
  return db.collection('ideas').doc(ideaId).get()
  .then(doc => {
    if (doc.exists) {
      return doc.data();
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
        id: doc.id,
        ...doc.data(),
      }];
    });
    console.log(ideas);
    return ideas;
  });
}

export {
  getIdeas,
  getIdeaById,
  addIdea,
  updateIdea,
}
