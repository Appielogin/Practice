// //Classes
// class user {
//     constructor(name, email) {
//         this.name = name;
//         this.email = email;
//     }

//     view() {
//         console.log("view");
//     }
// }

// // inheritance
// class admin extends user {
//     constructor(name, email) {
//         super(name, email); 
//     }
//     edit() {
//         console.log("edit");
//     }
// }

// let user1 = new user("ram", "ram.gmail.com");

// let admin1 = new admin("riya", "aaa@email.com");




// // promise
// getData = (dataId, getNextData) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Data", dataId);
//             resolve("done");
//             // if (getNextData) {
//             //     getNextData();
//             // }
//         }, 2000); //2s
//     });
// }

// // async function
// (async() => {
//     await getData(1);
//     await getData(2);
//     await getData(3);
// })(); //IIFE (fn)();

// //promise chain
// getData(1).then((res) => {
//     return getData(2);
// }).then((res) => {
//         return getData(3);
//     }).then((res) => {
//         console.log(res);
//     })

// //Nested callback ("Callback Hell")
// getData(1, () => {
//     getData(2, () => {
//         getData(3, () => {
//             getData(4)
//         });
//     });
// });

// //to avoid it we use promise
// const getPromise = () => {
//     return new Promise((resolve, reject) => {
//         console.log("I am a promise.");
//         resolve(111);
//     });
// }

// let pro = getPromise();

// pro.then(() => {
//     console.log("fullfilled");
// });


// //promise chain
// asyncFun1 = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("some data1...");
//             resolve("success");
//         }, 5000);
//     });
// }

// asyncFun2 = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("some data2...");
//             resolve("success");
//         }, 5000);
//     });
// }

// console.log("fetching1");
// asyncFun1().then(() => {
//     console.log("fetching2")
//     asyncFun2().then(() => {
//     });
// });


// to avoid promise chain (async function)

// hello = async() => {
//     console.log("hello");
// }

// api = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("weather data");
//             resolve(200);
//         }, 2000);
//     });
// }
// weatherData = async() => {
//     await api();  //1st call
//     await api();  //2nd call
// }


// API 
const URL = "https://dog.ceo/api/breeds/image/random";
const dog = document.querySelector("#dog");
const btn = document.querySelector("#btn");

const data = async() => {
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log(data.message);
    dog.src = data.message;
}

btn.addEventListener("click", data)
