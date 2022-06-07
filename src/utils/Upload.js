import { Firebase } from "./Firebase";

export class Upload {
    
    static send(file, from) {

        return new Promise((success, failure) => {

            let uploadTask = Firebase.hd().ref(from).child(Date.now() + file.name).put(file);
        
            uploadTask.on('state_changed', e => {

                console.info('upload: ', e)

            }, err => {

                failure(err);

            }, () => {

                success(uploadTask.snapshot);

            });
        })
    }
}