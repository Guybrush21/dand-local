import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as axios from 'axios';
import { v4 } from 'uuid';
declare const Buffer: any;

admin.initializeApp();

const USER = 'admin';
const PASSWORD = '74ffgr587w3£DDLo';
const BASE_URL = 'https://couchdb.elaine.pw';
const AUTH = Buffer.from(`${USER}:${PASSWORD}`).toString('base64');

const axiosAuth = axios.default.create({
  headers: { Authorization: `Basic ${AUTH}` },
});

exports.onNewAcc = functions.auth.user().onCreate((user) => {
  // Hex encoded user UID to use as database name
  // const hexUId = Buffer.from(user.uid).toString('hex');
  const password = v4();
  // Create user database
  return axiosAuth
    .put(`${BASE_URL}/_users/org.couchdb.user:${user.uid}/`, {
      type: 'user',
      name: user.uid,
      password: password,
      roles: [],
    })
    .then(() => {
      // Set credentials on a new user doc on Firestore
      admin.auth().setCustomUserClaims(user.uid, { couchtoken: password });
    })
    .catch((err) => console.error(err));
});

exports.onDeleteAcc = functions.auth.user().onDelete((user) => {
  admin.firestore().collection('users').doc(user.uid).delete();
  // Delete all user data
  axiosAuth.delete(`${BASE_URL}/_users/org.couchdb.user:${user.uid}/`);
});
