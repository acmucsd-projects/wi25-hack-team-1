import * as firebase from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import env from "@utils/validateEnv";

let serviceAccountKey: firebase.ServiceAccount;

if (!env.SERVICE_ACCOUNT_KEY) {
  throw new Error("Missing service account key");
} else {
  serviceAccountKey = env.SERVICE_ACCOUNT_KEY as firebase.ServiceAccount;
}

firebase.initializeApp({
  credential: firebase.cert(serviceAccountKey),
});

const firebaseAuth = getAuth();

export { firebaseAuth };
