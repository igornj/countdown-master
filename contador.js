//Acessando os números que iremos atrelar os parâmetro depois e div quando o cronometro estiver zerado
const dayOutput = document.querySelector('.content__days');
const hoursOutput = document.querySelector('.content__hours');
const minutesOutput = document.querySelector('.content__minutes');
const secondsOutput = document.querySelector('.content__seconds');
const timesUp = document.querySelector('.times-up');

//constante recebe o value do input armazenado no localStorage com o nome 'date'
const DATE_INPUT = localStorage.getItem('date');
//desestruturação que recebe o value do input separada por '/' e retorna uma array
const [day, month, year] = DATE_INPUT.split('/');
//Criamos uma nova data com os dados do input, invertendo a ordem para ter acesso ao timestamp
const END_DATE = new Date(year, month -1, day);
//Pegando o timestamp do dateObject
const END_DATETS = END_DATE.getTime();


let interval = null; //variavel que inicia vazia para manipular o intervalo depois
interval = setInterval(countDown, 1000);//Esta função irá ocorrer a cada 1 segundo

countDown();/*chamada de função que realiza o count down, 
                para que já ocorra a alteração no DOM assim que tivermos o value do input.*/

function countDown(){ 
    const DATE_NOW = new Date();//data atual
    const DATE_NOWTS = DATE_NOW.getTime();//Timestamp da data atual

    //diferença da data do input com a data atual, dividido por 1000 para termos o total de segundos
    const DIFFERENCE_IN_SECONDS = (END_DATETS - DATE_NOWTS) / 1000;

    if(DIFFERENCE_IN_SECONDS > 0){//se a diferança for maior do que 0, podemos ter o countdown

        let days = Math.floor(DIFFERENCE_IN_SECONDS / 3600 / 24); 
        let hours = Math.floor(DIFFERENCE_IN_SECONDS / 3600) % 24;
        let minutes = Math.floor(DIFFERENCE_IN_SECONDS / 60) % 60;
        let seconds = Math.floor(DIFFERENCE_IN_SECONDS) % 60;

    //atrela os resultados no DOM
        dayOutput.textContent = formatDate(days);
        hoursOutput.textContent = formatDate(hours);
        minutesOutput.textContent = formatDate(minutes);
        secondsOutput.textContent = formatDate(seconds);

    }else{//se menor a diferença for menor que 0
        timesUp.textContent = 'Ih Chegou!';

        clearInterval(interval); //encerra o intervalo

        dayOutput.textContent = "00";
        hoursOutput.textContent = "00";
        minutesOutput.textContent = "00";
        secondsOutput.textContent = "00";

    } 


};


function formatDate(time){//função que concatena um 0 caso os timers sejam menores que 10
    return time < 10 ? '0' + time : time;

}


