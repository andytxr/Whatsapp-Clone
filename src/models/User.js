import {Firebase} from './../utils/Firebase.js';
import {Model} from './Model.js';

export class User extends Model{


    constructor(id){

        super();

        if(id){

            this.getId(id);

        }

    }

    //Getters e Setter

    get name(){

        return this._data.name

    }
    set name(value){
    
        this._data.name=value;

    }

    get email(){

        return this._data.email

    }
    set email(value){
    
        this._data.email=value;

    }

    get chatId(){

        return this._data.chatId;
    }
    set chatId(value){
        
        return this._data.chatId = value;
    }

    get photo(){

        return this._data.photo

    }
    set photo(value){
    
        this._data.photo=value;

    }

    //Identificação do usuário

    static getRef(){

        return Firebase.db().collection('/users')

    }

    static getContactRef(id){

        return User.getRef().doc(id).collection('contacts');

    }

    getId(id){

        return new Promise((s,f)=>{

            User.idEmail(id).onSnapshot(doc =>{

                this.fromJSON(doc.data())

                s(doc)

            })

        });

    }

    static idEmail(id){

        return User.getRef().doc(id);

    }

    //Manipulação/Armazenamento de Dados

    saveUser(){

        return User.idEmail(this.email).set(this.toJSON());

    }

    addContact(contact){

        return User.getContactRef(this.email).doc(btoa(contact.email)).set(contact.toJSON());

    }

    getContact(filter = ''){

        return new Promise((s,f)=>{

            User.getContactRef(this.email).where('name', '>=', filter).onSnapshot(docs =>{

                let contacts = [];

                docs.forEach(doc=>{

                    let data = doc.data();
                    data.id=doc.id
                    contacts.push(data);

                })

                this.trigger('contactschanged', docs)

                s(contacts);

            })

        })

    }


}