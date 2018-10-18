import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBT_vLHpmweKi0cOWliK2Fh8T1AuVqxuvs",
    authDomain: "todo-f6fed.firebaseapp.com",
    databaseURL: "https://todo-f6fed.firebaseio.com",
    projectId: "todo-f6fed",
    storageBucket: "todo-f6fed.appspot.com",
    messagingSenderId: "154744688719"
};

export const initializeFirebaseApi = () => {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    });
};

export const createUserOnFirebaseAsync = async (email, password) => {
    const {user} = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    return user;
};

export const signInOnFirebaseAsync = async (email, password) => {
    const {user} = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

    return user;
};

export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        var unsubscribe = null;
        unsubscribe = firebase
            .auth()
            .onAuthStateChanged(
                (user) => {
                    resolve(user);
                },
                ( error ) => {
                    reject(error);
                },
                () => {
                    unsubscribe();
                }
            )
    });
};

export const writeTaskOnFirebaseAsync = async (task) => {

    const user = await currentFirebaseUser();

    var taskReference = firebase
        .database()
        .ref(user.id);

    const key = task.key ?
        task.key :
        taskReference
            .child('tasks')
            .push()
            .key;

    return await taskReference
        .child(`tasks/${key}`)
        .update(task);
};

export const readTaskFromFirebaseAsync = async (listener) => {

    const user = await currentFirebaseUser();
    var taskReference = firebase
        .database()
        .ref(user.id)
        .child('tasks');

    taskReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach( element => {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);
            });
            listener(tasks);
        })

};