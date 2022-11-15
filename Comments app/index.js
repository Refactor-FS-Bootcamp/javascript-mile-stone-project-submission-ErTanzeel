
class Notes {
    constructor(title, textarea) {
        this.title = title;
        this.textarea = textarea;
        this.like = 0;
        this.dislike = 0;
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
        let newId = this.MaxId() + 1
        obj.id = newId
        this.collection.push(obj)
        localStorage.setItem(this.key, JSON.stringify(this.collection))
    }


    DeleteComment(id) {
        console.log(id)
        this.collection = this.collection.filter(x => x.id != id)
        this.collection.splice(id, 1)
        localStorage.setItem(this.key, JSON.stringify(this.collection))
        location.reload();
    }

    Like(id) {
        let modifiedComment = this.collection.find(x => x.id == id)
        modifiedComment.like++
        localStorage.setItem(this.key, JSON.stringify(this.collection))
        location.reload();

    }

    Dislike(id) {
        let modifiedComment = this.collection.find(x => x.id == id)
        modifiedComment.dislike++
        localStorage.setItem(this.key, JSON.stringify(this.collection))
        location.reload();
    }

    MaxId() {
        if (!this.collection.length) return 0
        let maxId = this.collection.reduce((acc, current) => acc > current.id ? acc : current.id, 0)
        return maxId;
    }
}


// UI display class and function
class Display {
    static show(storeobj) {
        let obj2 = storeobj.collection;

        // console.log(obj2)
        const card1 = document.getElementById('card1');
        if (obj2.length) {
            console.log(obj2.length)
            card1.innerText = ''

            obj2.forEach((elem, index) => {
                card1.innerHTML += ` <div class="card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h6 class="card-title">${elem.title}&nbsp;<i class="fa-solid fa-user"  style='color:blue;'></i></h6>
                    <p class="card-text">${elem.textarea}</p>
    
                    <div class="select" style="float:left;">
                        <span> ${elem.like}</span>
                        <span onclick="Like(${elem.id})"><i class='fas fa-thumbs-up'
                         style='font-size:20px;color:blue;'></i></span>
    
                        <span class="unlike" style=" margin-left:8px;">${elem.dislike}</span>
                        <span onclick="Dislike(${elem.id})"> <i class='fas fa-thumbs-down' style='font-size:20px;color:red'></i></span>
                    </div>
    
                    <div class="button" style="float: right;">
                        <button  onclick="deleteComment(${elem.id})"><i class="fa-solid fa-trash"
                                style='font-size:20px;color:red'></i></button>
                    </div>
    
                </div>
            </div>`;
            });
        }
        else {
            card1.innerHTML = "<h3 style =' text-align:center; width:95%; font-family: cursive;'>Add comment to see here</h3>"
        }
    }

    static clear() {
        document.getElementById('title1').value = '';
        document.getElementById('textarea1').value = ''
    }

}


// to stay after reloading
let storeobj = new Store('comments')
Display.show(storeobj)


// submisson form
form2 = document.getElementById('btn')
form2.addEventListener('click', submisson);
function submisson(e) {
    debugger;
    e.preventDefault();
    let title = document.getElementById('title1').value
    let textarea = document.getElementById('textarea1').value
    console.log(title)

    let obj1 = new Notes(title, textarea);
    console.log(obj1)

    let storeobj = new Store('comments')

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


function Like(id) {
    let storeobj = new Store('comments')
    storeobj.Like(id)
}

function deleteComment(id) {
    let storeobj = new Store('comments')

    storeobj.DeleteComment(id)
}


function Dislike(id) {
    let storeobj = new Store('comments')
    storeobj.Dislike(id)
}

