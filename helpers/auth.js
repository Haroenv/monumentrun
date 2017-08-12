import { auth, ref } from './firebase';
import { Facebook } from 'expo';

const updateUserData = user => {
  const userData = user.providerData[0];
  ref
    .child(`users/${user.uid}`)
    .once('value')
    .then(sn => sn.val())
    .then(snapshot =>
      ref.child(`users/${user.uid}`).set({ ...snapshot, ...userData })
    );
};

export const getUser = () =>
  new Promise((resolve, reject) =>
    auth().onAuthStateChanged(user => {
      if (user !== null) {
        updateUserData(user);
        return resolve(user);
      }
      reject();
    })
  );

export async function loginWithFacebook() {
  const {
    type,
    token,
  } = await Facebook.logInWithReadPermissionsAsync('248515692334443', {
    permissions: ['public_profile'],
  });

  console.warn(token, type);

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    auth().signInWithCredential(credential).catch(error => {
      console.log(error);
      // Handle Errors here.
    });
  }
}
