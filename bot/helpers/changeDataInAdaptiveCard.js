//const { mainDynamicFunction } = require("./dynamic.js");
const { link } = require("fs");
const { doc, getDoc, deleteDoc, collection } = require("firebase/firestore");
const { db } = require("../firebase.js");
const { credential } = require("firebase-admin");
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const { promisify } = require('util');

const scriptsFolder = './db-functions/fetchers';
//C:/Users/Icepriest/TeamsApps/vbot-main2/vibot-main/bot



// Функция, которая принимает путь к папке и возвращает массив ключей-значений скриптов
function loadScripts(folderPath) {
  const scripts = {};

  fs.readdirSync(folderPath).forEach(file => {
    let filePath = path.join(folderPath, file);
    const { name, ext } = path.parse(file);

    // Проверяем, что файл является скриптом JavaScript
    if (ext === '.js') {
      // Динамически импортируем скрипт 

      filePath = filePath.replace(/\\/g, '/');

      const script = require('../' + filePath);

      // Используем имя файла (без расширения) в качестве ключа
      scripts[name] = script;
    }
  });

  return scripts;
}

//adminnew@mail.com blinadmin@mail.ru
// Загрузка скриптов из папки
//user1@m.com user1user
const scripts = loadScripts(scriptsFolder);

Object.keys(scripts).forEach(key => {
  console.log(key + ':', scripts[key]);
});

async function changeDataInAdaptiveCard(adaptiveCard, config) {
  const { context, credentials } = config;
  const contextData = context.activity;
  const userName = context.activity.from.name;
  const userEmail = credentials.userEmail;

  console.log("StartingChanges");

  try{
    await mainDynamicFunction(adaptiveCard, credentials);
  }
  catch (error){
    console.error("Error: ", error);
  }

  console.log("All Great at this point");

  return adaptiveCard;

//user3@gmail.com
//tetstmanager1@mail.com

}

async function mainDynamicFunction(adaptiveCard, credentials){
  console.log("main");
  await ReplaceLists(adaptiveCard, credentials);
  await ReplaceDtexts(adaptiveCard, credentials);
}

async function ReplaceLists(adaptiveCard, credentials){
  console.log("ReplaceLists");
  var arraysOfListData = []; //тут збреігаються усі фетч масиви усіх листів картки
  var adaptiveCardsLists = []; //поміщає сюди індекси для body, які ссилають на листи які потрібно замінити 

  for(let i = 0; i < adaptiveCard.body.length; i++){
      if (adaptiveCard.body[i].type === "DynamicList") {
          adaptiveCard.body[i].type = "Container"; //замінюємо тип динамічного листу на контейнер
          adaptiveCardsLists[adaptiveCardsLists.length]= i; //записуємо індекси таких контейнерів
          arraysOfListData[arraysOfListData.length] = await FetchListData(adaptiveCard.body[i].fetchinfo, credentials); //требуется массив под ключом фетчінфо
      }
  }

  for(let i = 0; i < adaptiveCardsLists.length; i++){
      let currentList = adaptiveCard.body[adaptiveCardsLists[i]]; //звертаємося до потрібного листа по індексу
      await CreateItemsFromDynamicItems(currentList, arraysOfListData[i], credentials);
  }

  //console.log(JSON.stringify(adaptiveCard, undefined, 2));
}

async function FetchListData(fetchinfo, credentials){ //собирает ссылочные данные из листов
  console.log("fetchListData");
  var fetchArray = [];
  for(let iterator = 0; iterator < fetchinfo.length; iterator++){ //ітеруємо одночасно самі фетчери та масив якій буде зберігати дані з них
      try{
        fetchArray[fetchArray.length] = await scripts[(fetchinfo[iterator].fetcher)](credentials); //виконуємо код який є у фетчах 
        console.log(JSON.stringify(fetchArray, undefined, 2));
      }
      catch (error){
        console.error("Error: ", error);
      }
  }
  return fetchArray;
}
//fetchArray[iterator] = require('../db-functions/fetchUsersEmailsByManagerEmail.js')(credentials.userEmail, credentials.companyName);
//{fetchUsersByManagerEmail} = require('../db-functions/fetchUsersByManagerEmail.js'); fetchArray[iterator] = fetchUsersByManagerEmail(credentials.userEmail, credentials.companyName).map((user) => user.data().userEmail);
//arrayOfListData має таку структуру: він тримає у кожному індексі окримі масиви з різними типами даних. 
//
function CreateItemsFromDynamicItems(dlist, arrayOfListData, credentials){ //другий параметр має у собі масиви, які створються за даних фетчерів. Кожин фетчер створює окремий субмасив
  let ditemsLength = dlist.ditems.length; //скільки усього ітемів у листі
  let maxLength = getMaxSubarrayLength(arrayOfListData);
  let finalItemSize = ditemsLength * maxLength;
  let ditemsObject = []; //Д-ітеми
  let itemsNewObject = []; //звичайні ітеми

  if(arrayOfListData === undefined) return;

  for (let i = 0; i < ditemsLength; i++){ //створюємо копію об'єкту Д-ітемів з джсон
      ditemsObject[i] = dlist.ditems[i];
  }

  for (let i = 0; i < finalItemSize;) {
    for (let j = 0; j < ditemsLength; j++, i++) {
      itemsNewObject[i] = JSON.parse(JSON.stringify(dlist.ditems[j])); // глубокая копия объекта
    }
  }

  const flattenedArray = [];

  if(arrayOfListData[0] === undefined) return;

  for (let j = 0; j < maxLength; j++) {
    for (let i = 0; i < arrayOfListData.length; i++) {
      flattenedArray[flattenedArray.length] = (arrayOfListData[i][j]);
      console.log(arrayOfListData[i][j]);
    }
  }
  console.log("next");

  for(let iterator = 0, flattenedIterator = 0; iterator < finalItemSize; iterator++){
    if(itemsNewObject[iterator].ltext === true){
      if(flattenedArray[flattenedIterator] !== undefined && flattenedArray[flattenedIterator] !== null && flattenedArray[flattenedIterator] !== ""){
        itemsNewObject[iterator].text = flattenedArray[flattenedIterator++];
      }
      else if(typeof flattenedArray[flattenedIterator] !== 'string' && flattenedArray[flattenedIterator] !== undefined && flattenedArray[flattenedIterator] !== null){
        itemsNewObject[iterator].text = "Error: value is not string";
        flattenedIterator++;
      }
      else{
         flattenedIterator++;
      }
    }
  }

  dlist["items"] = itemsNewObject;
}

function getMaxSubarrayLength(array) {
  let maxLength = 0;

  for (let i = 0; i < array.length; i++) {
    const subarrayLength = array[i].length;
    if (subarrayLength > maxLength) {
      maxLength = subarrayLength;
    }
  }

  return maxLength;
}


async function ReplaceDtexts(obj, credentials){
  console.log("Start of dtexts");
  for (let property in obj) {
    if (property === "dtext") {

      console.log("Start");

      let fetchedValue = await scripts[obj["dtext"]](credentials);



      
      console.log("after ");
      //console.log(obj['text']);

      console.log(fetchedValue);

      try{
        if(fetchedValue !== undefined && fetchedValue !== null && fetchedValue !== ""){
          obj['text'] = fetchedValue;
          console.log(obj['text']);
          console.log(obj);
        }
        else if(typeof fetchedValue !== 'string' && fetchedValue !== undefined && fetchedValue !== null){
          obj['text'] = "Error: value is not string";
        }
      }
      catch(error){
        console.error("Error: ", error);
      }
    }  
    else if (typeof obj[property] === 'object') {
      await ReplaceDtexts(obj[property], credentials);
    }
  }
}

module.exports = changeDataInAdaptiveCard;
