import { collection,addDoc } from "firebase/firestore";
import { db } from "./lib/firebaseConfig";
export function seedDatabase() {
    const users = [
      {
        userId: 'kdPQ53yoqoQkQ6eGOl8dLBBpDuC2',
        username: 'Tommy',
        fullName: 'Tommy Shelby',
        emailAddress: 'tommyshelby@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['kdPQ53yoqoQkQ6eGOl8dLBBpDuC2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['kdPQ53yoqoQkQ6eGOl8dLBBpDuC2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['kdPQ53yoqoQkQ6eGOl8dLBBpDuC2'],
        dateCreated: Date.now()
      }
    ];
  
    for (let k = 0; k < users.length; k++) {
      // db.collection('users').add(users[k]);
      const collectionRef = collection(db,'users');
      addDoc(collectionRef,users[k])

    }
  
    for (let i = 1; i <= 5; ++i) {
      const collectionRef = collection(db,'photos')
      addDoc(collectionRef,{
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      })
      // collection(db,'users').add({
      //   photoId: i,
      //   userId: '2',
      //   imageSrc: `/images/users/raphael/${i}.jpg`,
      //   caption: 'Saint George and the Dragon',
      //   likes: [],
      //   comments: [
      //     {
      //       displayName: 'dali',
      //       comment: 'Love this place, looks like my animal farm!'
      //     },
      //     {
      //       displayName: 'orwell',
      //       comment: 'Would you mind if I used this picture?'
      //     }
      //   ],
      //   userLatitude: '40.7128°',
      //   userLongitude: '74.0060°',
      //   dateCreated: Date.now()
      // })
    }
  }