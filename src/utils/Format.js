export class Format{

    static getCamelCase(text){

        let div = document.createElement('div');
        div.innerHTML=`<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];

    }

    static toTime(duration){

        let sec = parseInt((duration/1000)%60);
        let min = parseInt((duration/(1000*60))%60);
        let hours = parseInt((duration/(1000*60*60))%24);
        
        if(hours>0){

            return `${hours}:${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;

        }
        else{

            return `${min}:${sec.toString().padStart(2,'0')}`;

        }
    }

}