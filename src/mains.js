//document variables
const form = document.querySelector("#form");
const row = document.querySelector("#row");
const errorMessage = document.querySelector("#error-message");
const enterPlate = document.querySelector("#enter-plate");
const button = document.querySelector("#button");

const plate = enterPlate.value;

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
button.addEventListener("click", () => validatePlate(plate));

const validatePlate = async (plate) => {};

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

const getData = async (plate) => {
  let arrayResults = [];
  try {
    const isCarDeAlta = await deAlta(plate);
    const owner = await hasOwner(plate);
    arrayResults.push(plate);
    arrayResults.push(owner);
    const numFines = await hasFines(plate, owner);
    arrayResults.push(numFines);
  } catch (error) {
    printErrors(error);
  }
  return arrayResults;
};
const printErrors = (errors) => {
  const message = document.createElement("P");
  message.textContent = errors;
  errorMessage.append(message);
};

const print = async (plate) => {
  printArray = await getData(plate);

  if (printArray.length > 2) {
    const data1 = document.createElement("TD");
    data1.textContent = printArray[0];
    const data2 = document.createElement("TD");
    data2.textContent = printArray[1].carModel;
    const data3 = document.createElement("TD");
    data3.textContent = printArray[1].name;
    const data4 = document.createElement("TD");
    data4.textContent = printArray[1].telephone;
    const data5 = document.createElement("TD");
    data5.textContent = printArray[1].address;
    const data6 = document.createElement("TD");
    data6.textContent = printArray[2];
    row.append(data1, data2, data3, data4, data5, data6);
  }
};

print(plate);
