/* 
Здесь описан вызов API и то, что он выдает. Теоретически, че мешает тебе сунуть сюда несколько API?
Потом вытащишь то что надо. 
Источник большинства API: https://habr.com/ru/company/macloud/blog/562700/?ysclid=l8wq5giij2565117777
*/

/* 
Факты о котанах. Есть еще другие вариации: список фактов или виды котанов.
Документация: https://catfact.ninja/
*/
interface FactResponse {
    fact: string;
    length: number;
  }
  
  export const getRandomFact = (): PromiseLike<FactResponse> =>
    fetch("https://catfact.ninja/fact").then((response) => {
      return response.json();
    });

/* 
Чем заняться, когда скучно.
Документация: http://www.boredapi.com/documentation
Сервис BoredAPI может предложить занятие на любой случай жизни: бесплатные, социальные, доступные везде и так далее.
*/
interface ActivityResponse {
	activity: string;
	accessibility: number;
	type: string;
	participants: number;
	price: number;
	link: string;
	key: number;
  }
  
  export const getRandomActivity = (): PromiseLike<ActivityResponse> =>
    fetch("http://www.boredapi.com/api/activity/").then((response) => {
      return response.json();
    });

/* 
Колода карт
Примеры: https://deckofcardsapi.com
Теперь для организации виртуальной карточной игры не нужно ничего лишнего. 
Вы можете создать (перемешанную или нет) колоду, взять карту, задать колоду по кодам карт.е.
*/