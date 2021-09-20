

class Car {
    constructor(mark, model, year, id = document.querySelector('#car-list').childElementCount + 1) {
        //this.id = document.querySelector('#car-list').childElementCount + 1;
        this.id = id;
        this.mark = mark
        this.model = model
        this.year = year
    }
}
class UI {
    static findCarToEdit(cardata = null, button) {
        if (button == "edit") {
            let arr = JSON.parse(localStorage.cars)

            let filteredArr = arr.filter((el) =>
                el.mark === cardata.children[1].textContent
                && el.model === cardata.children[2].textContent
                && el.year == cardata.children[3].textContent)
            localStorage.setItem('carToEdit', JSON.stringify([]))
            localStorage.setItem('carToEdit', JSON.stringify(filteredArr))
        }
        else {
            let markValue = document.querySelector('#MARK').value
            let modeValue = document.querySelector('#MODEL').value
            let yearValue = document.querySelector('#YEAR').value
            let arr = JSON.parse(localStorage.carToEdit)
            let arr2 = JSON.parse(localStorage.cars)
            arr[0].mark = markValue
            arr[0].model = modeValue
            arr[0].year = yearValue
            arr2 = arr2.map(car => car.id !== arr[0].id ? car : arr[0])
            localStorage.setItem('cars', JSON.stringify(arr2))
            localStorage.setItem('carToEdit', JSON.stringify([]))
            localStorage.setItem('carToEdit', JSON.stringify(arr))
            UI.clearUI()
            UI.displayCars();

        }

    }
    static filter(value) {
        if (value !== '') {
            let arr = JSON.parse(localStorage.cars)
            let filteredArr = arr.filter((el) => el.mark === value)
            localStorage.setItem('cars', JSON.stringify(filteredArr))
            UI.clearUI();
            UI.displayCars()
        }
        else if (localStorage.length === 0 || 1) {
            localStorage.setItem('cars', JSON.stringify([]))
            UI.clearUI();
            Storage.addSomeCar();
            UI.displayCars();
        }
        else {
        }
    }
    static sort(target) {
        let button = document.querySelector(`#${target.id}`);
        let option = target.id;
        if (button.firstElementChild.classList.contains('fa-caret-down')) {

            let arr = JSON.parse(localStorage.cars)

            arr = arr.sort((a, b,) => {
                if (a[option] < b[option]) {
                    return -1;
                }
                if (a[option] > b[option]) {
                    return 1;
                }
                return 0;
            })
            localStorage.setItem('cars', JSON.stringify(arr))
            button.firstElementChild.classList.remove('fa-caret-down')
            button.firstElementChild.classList.add('fa-caret-up')
            UI.clearUI();
            UI.displayCars()
        }
        else if (button.firstElementChild.classList.contains('fa-caret-up')) {

            let arr = JSON.parse(localStorage.cars)

            arr = arr.sort((a, b,) => {
                if (a[option] < b[option]) {
                    return 1;
                }
                if (a[option] > b[option]) {
                    return -1;
                }
                return 0;
            })

            localStorage.setItem('cars', JSON.stringify(arr))
            UI.clearUI();
            UI.displayCars()

            button.firstElementChild.classList.remove('fa-caret-up')
            button.firstElementChild.classList.add('fa-caret-down')
        }
    }
    static clearUI() {
        const list = document.querySelector('#car-list')
        list.innerHTML = ""
    }
    static displayCars() {
        const cars = Storage.getCars()
        cars.forEach((car) => UI.addCarToList(car))

    }
    static addCarToList(car) {
        const list = document.querySelector('#car-list')
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${car.id}</td>
        <td>${car.mark}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit</button></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row)
    }
    static showAllert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container-lg')
        const form = document.querySelector('.car-form');
        container.insertBefore(div, form)
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }
    static clearFields() {
        document.querySelector('#Mark').value = ''
        document.querySelector('#Model').value = ''
        document.querySelector('#Year').value = ''

    }
    static removeElement(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }
}
class Storage {
    static addSomeCar() {

        let Mercedes = new Car("Mercedes", "Amg", 1997, 1)
        let Mazda = new Car("Mazda", "6", 2002, 2)
        let Hyundai = new Car("Hyundai", "Santa Fe", 2008, 3)
        let Lexus = new Car("Lexus", "LFA", 2010, 4)
        let Porshe = new Car("Porshe", "Cayen", 2005, 5)
        let Fiat = new Car("Fiat", "126p", 1987, 6)
        let Fiat2 = new Car("Fiat", "Ducato", 2005, 7)
        let Bmw = new Car("Bmw", "M4", 2015, 8)
        let Audi = new Car("Audi", "A8", 2020, 9)
        let Mercedes2 = new Car("Mercedes", "Vito", 2005, 10)
        const cars = [Mercedes, Mazda, Hyundai, Lexus, Porshe, Fiat, Fiat2, Bmw, Audi, Mercedes2]
        cars.forEach(car => Storage.addCar(car))
    }

    static getCars() {
        let cars
        if (localStorage.getItem("cars") === null) {
            cars = []
        }
        else {
            cars = JSON.parse(localStorage.getItem('cars'))
        }
        return cars
    }
    static addCar(car) {
        const cars = Storage.getCars()

        cars.push(car)
        localStorage.setItem('cars', JSON.stringify(cars))
    }
    static removeCar(id) {
        const cars = Storage.getCars();

        cars.forEach((car, index) => {

            if (car.id == id) {
                cars.splice(index, 1)
            }
        })
        localStorage.setItem('cars', JSON.stringify(cars))
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("cars") === '[]' || localStorage.length === 0) {
        Storage.addSomeCar();
    }

})
document.addEventListener('DOMContentLoaded', UI.displayCars)

document.querySelector('.car-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const mark = document.querySelector('#Mark').value
    const model = document.querySelector('#Model').value
    const year = document.querySelector('#Year').value
    if (mark === '' || model === '' || year === '') {
        UI.showAllert("Please fill all fields", 'danger')
    }
    else {
        const car = new Car(mark, model, year)
        UI.addCarToList(car);
        UI.clearFields();
        Storage.addCar(car)
        UI.showAllert('Car Added', 'success')
    }
})

document.querySelector('#car-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        UI.removeElement(e.target)
        Storage.removeCar(
            e.target.parentElement.parentElement.children[0].textContent)
    }
    else {
        UI.findCarToEdit(e.target.parentElement.parentElement, "edit")
    }
})
document.querySelector('#model').addEventListener('click', (e) => {
    UI.sort(e.target)
})
document.querySelector('#year').addEventListener('click', (e) => {
    UI.sort(e.target)
})
document.querySelector("#search").addEventListener('click', () => {
    UI.filter(document.getElementById("mark").value);
})
document.querySelector("#edit").addEventListener('click', (e) => {
    UI.findCarToEdit(null, "update")
})