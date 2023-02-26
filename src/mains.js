document.addEventListener("DOMContentLoaded", () => {
  //document variables
  const form = document.querySelector("#form");
  const errorMessage = document.querySelector("#error-message");
  const plateField = document.querySelector("#plate-field");
  const table = document.querySelector("#table");
  const deleteButton = document.querySelector("#delete-button");
  const fragment = document.createDocumentFragment();
  // other variables
  let arrayCarsWithFines =
    JSON.parse(localStorage.getItem("listCarsWithFine")) || [];
  const regEx = /^[0-9]{4}\-[a-zA-Z]{4}$/;
  //arrays:

  const arrayCars = [
    { plate: "1234-abcd", alta: true },
    { plate: "4321-dcba", alta: false },
    { plate: "5678-efgh", alta: true },
    { plate: "8765-hgfe", alta: false },
    { plate: "9123-ijkl", alta: true },
    { plate: "3219-lkji", alta: true },
    { plate: "4567-mnop", alta: true },
    { plate: "5268-zxyv", alta: true },
    { plate: "8139-sdhg", alta: true },
  ];
  const arrayHasOwner = [
    {
      plate: "1234-abcd",
      owner: {
        name: "Jack Black",
        telephone: "12345678",
        address: "1 First Street",
        carModel: "mercedes",
      },
    },
    {
      plate: "5678-efgh",
      owner: {
        name: "Chris Hemsworth",
        telephone: "56789123",
        address: "5 Mills Street",
        carModel: "Lamborgini",
      },
    },
    {
      plate: "9123-ijkl",
      owner: {
        name: "Harry Potter",
        telephone: "23456789",
        address: "2 West Street",
        carModel: "holden",
      },
    },
    {
      plate: "3219-lkji",
      owner: {
        name: "Kate Blanchett",
        telephone: "45678912",
        address: "5 Diagonal Street",
        carModel: "Audi",
      },
    },
    {
      plate: "4567-mnop",
      owner: {
        name: "Bridget JOnes",
        telephone: "34567891",
        address: "2 King William Street",
        carModel: "ford",
      },
    },
  ];
  const arrayHasFines = [
    { plate: "1234-abcd", fines: 3 },
    { plate: "9123-ijkl", fines: 7 },
    { plate: "4567-mnop", fines: 9 },
  ];

  // eventlistener
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    getData();
  });
  deleteButton.addEventListener("click", () => deleteAll());

  //FUNCTIONS
  const validatePlate = async () => {
    let plate = plateField.value;
    if (regEx.test(plate) == true) {
      return plate;
    } else {
      throw `The plate you entered is not a valid plate`;
    }
  };

  const deAlta = async (plate) => {
    let carDeAlta = arrayCars.find((item) => item.plate == plate)?.alta;
    if (carDeAlta == true) {
      return carDeAlta;
    } else {
      if (carDeAlta == false) {
        throw `El coche con placa ${plate} no esta de alta`;
      } else {
        throw `El coche con placa ${plate} no esta en nuestro base de datos`;
      }
    }
  };

  const hasOwner = async (plate) => {
    let owner = arrayHasOwner.find((item) => item.plate == plate)?.owner;
    if (owner != undefined) {
      return owner;
    } else {
      throw `El coche con place ${plate} no tiene propietario`;
    }
  };

  const hasFines = async (plate, owner) => {
    let fine = arrayHasFines.find((item) => item.plate == plate)?.fines;
    if (fine != undefined) {
      return fine;
    } else {
      throw ` El coche con placa ${plate}  y propietario ${owner.name} no tiene multas`;
    }
  };

  const getData = async () => {
    errorMessage.innerHTML = "";

    let car = {};
    try {
      const validPlate = await validatePlate();
      const isCarDeAlta = await deAlta(validPlate);
      const owner = await hasOwner(validPlate);
      const numFines = await hasFines(validPlate, owner);
      car.plate = validPlate;
      car.owner = owner.name;
      car.address = owner.address;
      car.model = owner.carModel;
      car.telephone = owner.telephone;
      car.fines = numFines;
      checkPrintStatus(car);
    } catch (error) {
      printErrors(error);
    }
  };

  const printErrors = (errors) => {
    const message = document.createElement("P");
    message.textContent = errors;
    errorMessage.append(message);
  };
  const checkPrintStatus = async (car) => {
    const carAlready = arrayCarsWithFines.find(
      (item) => item.plate == car.plate
    );
    if (!carAlready) {
      arrayCarsWithFines.push(car);
      localStorage.setItem(
        "listCarsWithFine",
        JSON.stringify(arrayCarsWithFines)
      );
      print();
    } else {
      const error = "Coche ya en la lista, ver tabla abajo";
      printErrors(error);
    }
  };

  const print = async () => {
    table.innerHTML = "";
    arrayCarsWithFines.forEach((car) => {
      const row = document.createElement("TR");
      const data1 = document.createElement("TD");
      data1.textContent = car.plate;
      const data2 = document.createElement("TD");
      data2.textContent = car.carModel;
      const data3 = document.createElement("TD");
      data3.textContent = car.owner;
      const data4 = document.createElement("TD");
      data4.textContent = car.telephone;
      const data5 = document.createElement("TD");
      data5.textContent = car.address;
      const data6 = document.createElement("TD");
      data6.textContent = car.fines;
      row.append(data1, data2, data3, data4, data5, data6);
      fragment.append(row);
    });
    table.innerHTML =
      "<tr><th>Number Plate</th><th>Model</th><th>Owner</th><th>Owner Tel.</th><th>Owner Add.</th><th>Fines</th></tr>";
    table.append(fragment);
  };

  const deleteAll = () => {
    localStorage.clear();
    arrayCarsWithFines = [];
    print();
  };

  print();
}); //LOAD
