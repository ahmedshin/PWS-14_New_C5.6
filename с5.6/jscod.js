/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */

function useRequest(url, callback) {
  // Ищем введеное значение
const width = document.getElementById('search1').value;
const height = document.getElementById('search2').value;


if ((width < 100 && width >= 300) || (height < 100 && height >= 300)){  
  alert("одно из чисел вне диапазона от 100 до 300");
}else if ((width >= 100 && width <= 300) || (height >= 100 && height <= 300)){
  // Делаем запрос за данными
  url = url + "/" + width + "/" + height;
  fetch(url)
    .then((response) => {
      if (response.status != 200) {
      console.log('Статус ответа: ', response.status);
    }else{
        const result = response.url;
        //if (callback) {
        //callback(result);
      //}
      
      const cardBlock = `
      <div class="card">
        
        <p>url: ${result}</p>
        
      </div>
    `;
    resultNode.innerHTML = cardBlock;
    }
    })
    
    .catch(() => { console.log('error') });
 
};

}; 
  
  

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <p>id:  ${item.id}</p>
        <p>author:  ${item.author}</p>
        <p>width: ${item.width}</p>
        <p>height: ${item.height}</p>
        <p>url: ${item.url}</p>
        <p>download_url: ${item.download_url}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  useRequest('https://picsum.photos', displayResult);
})