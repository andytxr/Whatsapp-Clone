import{ClassEvent} from "../utils/ClassEvent.js";

export class MicrophoneController extends ClassEvent{

    constructor(){

        super();

        this._available = false;
        this._mimeType = 'audio/webm';

        navigator.mediaDevices.getUserMedia({
            audio:true
        }).then(stream=>{

            this._available = true;

            this._stream = stream;

            this.trigger('ready', this._stream);
        
        }).catch(err=>{

            console.error(err)

        })

    }

    //Gravação

    startRecorder(){

        if(this.isAvailable()){

            this._mediaRec = new MediaRecorder(this._stream, {
                
                mimeType: this._mimeType

            })

            this._recordedParts = [];

            this._mediaRec.addEventListener('dataavailable', e=>{

                if(e.data.size>0){

                    this._recordedParts.push(e.data);

                }

            })

            this._mediaRec.addEventListener('stop', e =>{

                let blob = new Blob([this._recordedParts, {
                    type:this._mimeType
                }])
                let filename = `rec${Date.now()}.webm`
                let file = new File([blob], filename, {

                    type: this._mimeType,
                    lastModified: Date.now()

                });
                
                console.log('chegamos no file', file);
                
                let reader = new FileReader();

                reader.onload = e =>{

                    console.log('chegamos no reader', file);

                    let audio = new Audio(reader.result);
                    audio.play();

                }
                reader.readAsDataURL(file);

            });

            this._mediaRec.start();
            this.recordMicrophoneTimer();

        }

    }

    stopRecorder(){

        if(this.isAvailable()){

            this._mediaRec.stop();
            this.stopMicrophone();
            this.stopRecordMicrophoneTimer();

        }

    }

    //Iniciando funcionalidades

    stopMicrophone(){

        this._stream.getTracks().forEach(track=>{

            track.stop();

        })

    }

    isAvailable(){

        return this._available

    }

    recordMicrophoneTimer(){

        let start = Date.now();
        
        this._recordMicrophoneInterval = setInterval(() => {
            
          this.trigger('rectime', (Date.now() - start));

        }, 100)

    }

    
    stopRecordMicrophoneTimer(){

        clearInterval(this._recordMicrophoneInterval);

    }

}