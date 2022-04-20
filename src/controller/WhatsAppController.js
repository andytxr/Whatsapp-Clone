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

        this.el.inputNamePanelEditProfile.on('keypress', e=>{

            if(e.key==='Enter'){

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();

            }

        })

        this.el.btnSavePanelEditProfile.on('click', e=>{

            console.log(this.el.inputNamePanelEditProfile.innerHTML);

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

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{

            item.on('click', e=>{

                this.el.home.hide();
                this.el.main.css({
                    display:'flex'
                })

            })

        })

        //Eventos da tela de conversação

        this.el.btnAttach.on('click', e=>{

            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this))
            
        })

        //Camera

        this.el.btnAttachCamera.on('click', e=>{

            this.closeMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                height:'500px'
            })
            
        })

        this.el.btnClosePanelCamera.on('click', e=>{

            this.closeMainPanel();
            this.el.panelMessagesContainer.show();

        })

        this.el.btnTakePicture.on('click', e=>{

            console.log('take picture')

        })

        //Contatos

        this.el.btnAttachContact.on('click', e=>{

            this.el.modalContacts.show();
            
        })

        this.el.btnCloseModalContacts.on('click', e=>{

            this.el.modalContacts.hide();
        })

        //Documentos

        this.el.btnAttachDocument.on('click', e=>{

            this.closeMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                height:'500px'
            })
        })

        this.el.btnClosePanelDocumentPreview.on('click', e=>{

            this.closeMainPanel();
            this.el.panelMessagesContainer.show();

        })

        this.el.btnSendDocument.on('click', e=>{

            console.log('Send document');

        })

        //Fotos

        this.el.btnAttachPhoto.on('click', e=>{

            this.el.inputPhoto.click()

        })

        this.el.inputPhoto.on('change', e=>{

            [...this.el.inputPhoto.files].forEach(file=>{

                console.log(file);

            })

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

    closeMenuAttach(e){

        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open');

    }

    closeMainPanel(){

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');


    }

}
