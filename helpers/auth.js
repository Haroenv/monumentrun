import { auth } from './firebase';
import { Facebook } from 'expo';

export const getUser = () =>
  new Promise((resolve, reject) =>
    auth().onAuthStateChanged(user => {
      if (user != null) {
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

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    auth().signInWithCredential(credential).catch(error => {
      // Handle Errors here.
    });
  }
}
