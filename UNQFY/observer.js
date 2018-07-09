

class Observer {

    change(object, params){
        // Recive un objeto el cual ha cambiado y recibe un parametro el cual tiene
        // un string el cual representa el cambio del object.
    }

}


class Observable {

    constructor(){
        this.observers = [];
    }


    addObserver(observer){
        if(!(observer in this.observers)){
            this.observers.push(observer);
        }
    }


    deleteObserver(observer){
        this.observers = this.observers.filter(observer_ => observer_ !== observer);
    }


    notify(object, data){
        if(!this.observers){
            this.observers.forEach(observer =>{
            observer.change(object, data); 
        })
        }
    }


}


module.exports = {
    Observable,
    Observer, 
  };