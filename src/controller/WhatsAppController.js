class WhatsAppController{

    constructor(){

       this.elementsPrototype();
       this.loadElements();
       this.initEvents();

    }

    //Iniciando eventos

    initEvents(){

        //Eventos do perfil

        this.el.myPhoto.on('click', e=>{

            this.closeLeftPanels();

            this.el.panelEditProfile.show();

            setTimeout(()=>{

                this.el.panelEditProfile.addClass('open');

            },300)

            
        })    

        this.el.btnClosePanelEditProfile.on('click', e=>{

            this.el.panelEditProfile.removeClass('open');

        })

        this.el.photoContainerEditProfile.on('click', e=>{

            this.el.inputProfilePhoto.click();

        })

        this.el.inputNameEditProfile.on('keypress', e=>{

            if(e.key==='Enter'){

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();

            }

        })

        this.el.btnSavePanelEditProfile.on('click', e=>{



        })

        this.el.formPanelAddContact.on('submit', e=>{

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);

        })

        //Eventos de contato

        this.el.btnNewContact.on('click', e=>{

            this.closeLeftPanels();

            this.el.panelAddContact.show();
            setTimeout(()=>{

                this.el.panelAddContact.addClass('open');

            },300)
            
        })

        this.el.btnClosePanelAddContact.on('click', e=>{

            this.el.panelAddContact.removeClass('open');

        })

    }

    //Iniciando elementos 

    loadElements(){

        this.el={};

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)]=element;

        })

    }

    elementsPrototype(){

        Element.prototype.hide=function(){

            this.style.display="none";
            return this;

        }

        Element.prototype.show=function(){

            this.style.display="block";
            return this;

        }

        Element.prototype.toggle=function(){

            this.style.display=(this.style.display === 'none') ? 'block' : 'none';
            return this;

        }

        Element.prototype.on=function(events, fn){

            events.split(' ').forEach(event =>{

                this.addEventListener(event, fn);

            });
            return this;

        }

        Element.prototype.css=function(styles){

            for(let name in styles){

                this.style[name]=styles[name];

            }
            return this;

        }

        Element.prototype.addClass=function(className){

            this.classList.add(className);
            return this;

        }

        Element.prototype.removeClass=function(className){

            this.classList.remove(className);
            return this;

        }

        Element.prototype.toggleClass=function(className){

            this.classList.toggle(className);
            return this;

        }

        Element.prototype.hasClass=function(className){

            return this.classList.contains(className);

        }

        HTMLFormElement.prototype.getForm=function(){

            return new FormData(this);

        }


        HTMLFormElement.prototype.toJSON=function(){

            let json = {};

            this.getForm().forEach((value, key)=>{

                json[key] = value;

            });

            return json;
        }
    }

    //Funcionalidades do Displays the

    closeLeftPanels(){

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }

}
