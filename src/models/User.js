import {Firebase} from './../utils/Firebase.js';
import {ClassEvent} from './../utils/ClassEvent.js';

export class User extends ClassEvent{

    static getRef(){

        return Firebase.db().collection('/users')

    }

    static idEmail(email){

        return User.getRef().doc(email);

    }

}