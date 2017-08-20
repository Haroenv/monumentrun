import { firebaseImages } from './firebase';

const atob = (input: string): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  console.log(input);
  const str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 === 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  /* eslint-disable no-bitwise */
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }
  /* eslint-enable no-bitwise */
  return output;
};

const convertToByteArray = input => {
  const binaryString = atob(input);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const uploadFile = ({
  run,
  venue: { id },
  file,
}: {
  run: string,
  venue: { id: string },
  file: string,
}) => {
  try {
    const ref = firebaseImages({ run, venue: id });
    const uploadTask = ref.put(convertToByteArray(file), {
      contentType: 'image/jpeg',
    });

    uploadTask.on(
      'state_changed',
      snapshot =>
        console.log(
          `Upload is ${snapshot.bytesTransferred /
            snapshot.totalBytes *
            100}% done`
        ),
      error => console.warn('in _uploadAsByteArray ', error),
      () => console.log('_uploadAsByteArray ', uploadTask.snapshot.downloadURL)
    );
  } catch (ee) {
    console.warn('when trying to load _uploadAsByteArray ', ee);
  }
};
