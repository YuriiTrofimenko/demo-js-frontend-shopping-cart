const toNumberFromBHtml = (item) => {
    const resultValue = item.getElementsByTagName('b')[1].innerHTML
    console.log(resultValue);
    return resultValue
  }
  
  const array = Array.from(document.getElementsByClassName('item'));
  
  //2 значения
  //-1 0 1
  array.sort((item, secondItem) => toNumberFromBHtml(item) - toNumberFromBHtml(secondItem));
  
  console.log('----------------------------------')
  // array.map(data=>toNumberFromBHtml(data))
  console.log(array)
  
  document.getElementById('catalog').innerHTML = null;
  
  array.map(data=>document.getElementById('catalog').appendChild(data))