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

export const getUser = callback =>
  auth().onAuthStateChanged(user => {
    callback(user);
    if (user !== null) {
      updateUserData(user);
    }
  });

export async function loginWithFacebook() {
  const {
    type,
    token,
  } = await Facebook.logInWithReadPermissionsAsync('248515692334443', {
    permissions: ['public_profile'],
  });

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = auth.FacebookAuthProvider.credential(token);

    try {
      // Sign in with credential from the Facebook user.
      const result = await auth().signInWithCredential(credential);
      return result;
    } catch (error) {
      return error;
      // Handle Errors here.
    }
  }
}

export const signOut = () => auth().signOut();
