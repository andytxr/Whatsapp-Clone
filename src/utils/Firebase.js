const firebase = require('firebase')
require('firebase/firestore');
require('firebase/auth')

export class Firebase{

    constructor(){

        this._config = {

            apiKey: "AIzaSyCR77PEr7VfEq-Ji6a24IhZq-WL5FcNMso",
            authDomain: "whatsapp-clone-7e5d5.firebaseapp.com",
            projectId: "whatsapp-clone-7e5d5",
            storageBucket: "whatsapp-clone-7e5d5.appspot.com",
            messagingSenderId: "729623333970",
            appId: "1:729623333970:web:8e3915e909b0737983a38b",
            measurementId: "G-FJX5M3TWMC"

        };

        this.init()

    }

    init(){
[]
        if(!window._initializedFb){

            firebase.initializeApp(this._config);
            firebase.firestore().settings({})
            window._initializedFb=true;

        } 

    }

    initAuth() {

        return new Promise((s,f) =>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result =>{

                let token = result.credential.accessToken;
                let user = result.user;
                
                s({
                    user,
                    token
                });

            }).catch(err =>{

                f(err)

            })

        })

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();
        
    }

}