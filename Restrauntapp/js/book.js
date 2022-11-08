let name1 = document.getElementById('name');
let select = document.getElementById('select');
let date = document.getElementById('date');
let time = document.getElementById('time');

class Input {
    constructor(name, select, date, time) {
        this.name = name;
        this.select = select;
        this.date = date;
        this.time = time;

    }
    clear() {
        name1.value = '';
        select.value = '';
        date.value = '';
        time.value = '';
    }
}

class Store {
    collection = [];
    key = '';

    constructor(localkey) {
        this.key = localkey;
        this.collection = JSON.parse(localStorage.getItem(this.key)) ?? [];
        localStorage.setItem(this.key, JSON.stringify(this.collection))
    }
    add(obj) {
        this.collection.push(obj)
        localStorage.setItem(this.key, JSON.stringify(this.collection))
    }

    get getCollection() {
        return JSON.parse(localStorage.getItem(this.key))
    }
}


document.getElementById('btn').addEventListener('click', submitform)
function submitform(e) {
    e.preventDefault()
    let nameval = name1.value;
    let selectval = select.value;
    let dateval = date.value;
    let timeval = time.value;

    let storeobj = new Store('order')
    let obj = new Input(nameval, selectval, dateval, timeval)

    if (nameval == '' && selectval == '' && dateval == '' && timeval == '') {
        alert('first fill the form')
    }
    else {
        storeobj.add(obj)
        obj.clear()
       

    }
}
