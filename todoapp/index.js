console.log('hello js')

class Notes {
    constructor(title, textarea,) {
        this.title = title,
            this.textarea = textarea,
            this.date = new Date().toLocaleDateString()
    }


}


// storage class and function

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

    deletenode(id) {
        console.log('i am deelting', id)
        this.collection = this.collection.filter(elemet => elemet.id != id)
        this.collection.splice(id, 1)
        localStorage.setItem(this.key, JSON.stringify(this.collection));
        location.reload();
    }


}


// UI display class and function
class Display {
    static show(storeobj) {
        let obj2 = storeobj.collection;
        console.log(obj2)
        const card1 = document.getElementById('card1');
        if (obj2.length) {
            console.log(obj2.length)
            card1.innerText = ''

            obj2.forEach((elem, index) => {
                card1.innerHTML += `<div class="card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${elem.title}</h5>
                    <p class="card-text">${elem.textarea}</p>
                    <a id='${index}' onclick ="storeobj.deletenode(this.id)" class="btn btn-danger">Delete</a>

                    <span class='date' style='position:relative;top:20px;left:96px;'>${elem.date} </span>
                    </div>`;

            });
        }
        else{
            card1.innerHTML="<h3 style =' text-align:center; width:66%;' >Nothing in list</h3>"
        }
    }

    static clear() {
        document.getElementById('title1').value = '';
        document.getElementById('textarea1').value = ''
    }

}


// to stay after reloading
let storeobj = new Store('key')
Display.show(storeobj)


// submisson form
form2 = document.getElementById('form1')
form2.addEventListener('submit', submisson);
function submisson(e) {
    e.preventDefault();
    title = document.getElementById('title1').value
    textarea = document.getElementById('textarea1').value

    let obj1 = new Notes(title, textarea);

    let storeobj = new Store('key')

    //validation//
    if (title == '' && textarea == '') {
        alert('first fill the form')
    }
    else {

        storeobj.add(obj1)
        Display.show(storeobj)

        Display.clear()
    }

}

