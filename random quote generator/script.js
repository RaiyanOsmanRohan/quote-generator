const quoteText = document.getElementById("quoteText");
const authorName = document.getElementById("authorName");
const generateButton = document.getElementById("generator");
const saveButton = document.getElementById("saveQuote");
const savedQuotesSection = document.querySelector(".savedQuotes");

generateButton.addEventListener("click" , generateQuote);
saveButton.addEventListener("click" , saveQuote);

let savedQuotesArray = [];
let currentQuote  = {};

generateQuote();

 async function generateQuote(){

   quoteText.textContent ="";
   authorName.textContent ="";

   const apiKey = "qoOo2fm9U5Ht7xSEN7LyEQ==4EoIYKX8S6pQng4w";
   const url = 'https://api.api-ninjas.com/v1/quotes';

   try{
    const response = await fetch(url , {
      method: 'GET',
      headers:{'X-Api-Key' : apiKey},
    });

    const data = await response.json();
    const quote = data[0]

    quoteText.textContent = `${quote.quote}`;
    authorName.textContent = `${quote.author}`;

    currentQuote = {quote: quote.quote,
                    author : quote.author
                  }
   }
   catch(error){
    console.log(error)
   };
  }


  function saveQuote(){

      if(!currentQuote.quote || !currentQuote.author){
        return;
      }
      if(!savedQuotesArray.some(q => q.quote === currentQuote.quote && q.author === currentQuote.author)){
        savedQuotesArray.push({...currentQuote});
      }
      renderQuoteCard(savedQuotesArray);
  }

  function renderQuoteCard(array){
    savedQuotesSection.innerHTML = "";

    array.forEach((element)=>{
      if(!element.quote  || !element.author){
        return;
      }else{
        savedQuotesSection.innerHTML +=
        `<div class="quoteCard"><p>${element.quote} - <span class="authorStrong">${element.author}</span></p></div>`;
      }
    });

  };
