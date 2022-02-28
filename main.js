class Game{
    field;

    constructor(field){
        this.field = field;
    }

    // Создание массива определенной величины
    range(count){
        let arr = new Array(count);

        for(let i = 0; i < arr.length; i++){
            arr[i] = i + 1;
        }

        return arr;
    }
    // Перемешивание чисел в массиве
    shuffle(arr){

        for(let i = 0; i < arr.length - 1; i++){
            let min = i + 1;
            let max = arr.length;
            let randomIndex = Math.floor(Math.random() * (max - min) + min);

            let temp = arr[i];
            arr[i] = arr[randomIndex];
            arr[randomIndex] = temp;
        }

        return arr;
    }
    // Разделение массива на 2-мерный
    chunk(arr, n){
        let newArr = [];

        for(let i = 0; i < n; i++){
            let innerArr = [];
            for(let j = 0; j < arr.length / n; j++){
                innerArr[j] = arr[j + i*n]
            }
            newArr.push(innerArr);
        }

        return newArr;
    }
    // Подготовка массива в игровое поле
    prepare(size){
        let arr = [];

        arr = this.range(size*size);
        arr = this.shuffle(arr);
        arr = this.chunk(arr, size);

        return arr;
    }
    build(field, size){
        let arr = this.prepare(size);
        let cells = [];

        field.innerHTML = "";

        for(let i = 0; i < arr.length; i++){
            let tr = document.createElement("tr");
            for(let j = 0; j < arr[i].length; j++){
                let td = document.createElement("td");
                td.innerHTML = arr[i][j];
                cells.push(td);
                tr.append(td);
            }
            field.append(tr);
        }
        return cells;
    }

    activate(cells, size){
        let counter = 1;
        let last = size*size;
        let lastCounter = 0;

        function func(cell){
            if(cell.innerHTML == counter){
                cell.classList.add("active");

                if(counter == last){
                    size++;
                    this.start(size);
                }

                counter++;
            }
        }

        let func1 = func.bind(this);

        for(let cell of cells){
            cell.addEventListener("click", () => func1(cell));
        }
    }

    start(size){
        this.activate(this.build(field, size), size);
    }
}

let g = new Game(field);
g.start(2);

// let obj = {
//     lol: "kek"
// }
// function func2(){
//     console.log(this.lol);
// }
// let func3 = func2.bind(obj);
// func3();
