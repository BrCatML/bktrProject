# Testing different projects
Данный проект создан для тестирования других проектов - не слишком сложная симпатичная оболочка, разделы которой будут использоватья в других проектах.

Пока в качестве основного стиля используетя [Ant Design](https://ant.design/). В дальнейшем, планируется от него отойти и создать свои компоненты - когда дойдут руки до больших тестов с версткой.

## Навигация проекта
 - `src/main.tsx` - точка входа проекта
 - `src/router.tsx` - dom дерево проекта. В идеале надо бы как-то автоматизировать его составление. Пока его элемент используется для составления меню.
 - `src/routes` - основные страницы/разделы проекта + меню.
 - `src/routes/root.tsx` - Меню. Составляется автоматически, можно не трогать.
 - `src/routes/pages` - основные страницы (разделы)
 - `src/static/` - содержит картинки и стили проекта
 - `src/projects` - содержит файлы разных проектов. Решила делить так, чтобы знать что к чему относится.

## Проекты
### Хуки + использование API
 - Неплохое описание хуков реакта с примерами [здесь](https://github.com/harryheman/React-Total/blob/main/md/hooks.md)

### Redux
 - отсутствует. Вместо него effector
 - manual RU 1: [Введение в Redux & React-redux](https://habr.com/ru/post/498860/?ysclid=l63kvb34ii459220139)
 - manual RU 2: [React Redux | React с примерами кода](https://reactdev.ru/libs/redux/react-redux/)

### Effector
 - [Документация](https://effector.dev/)

 ### React Flow
 - Графический редактор
 - [GitHub](https://github.com/wbkd/react-flow?ysclid=l9p9h0hce1507052896)
 - установка: `npm install reactflow`

 ### Table
 - Вывод данных в виде таблицы с возможностью редактирования и скачивания (получения) результата. Скачивание в рамках данного проекта отключено, т.к. не имеет смысла.

## Дополнительно в проекте используются:
 - vite, потому что с ним npm run dev работает быстрее, чем без.

## Планы
 - Научиться работать с темами оформения.
 - Изучение верстки. Пробная реализация идей отсюда: [webDesign](https://ru.pinterest.com/bktrml/webdesign/). Можно подергать картинки из FarCry6 для фона.
 - Создание компонентов.

### Docker

Для работы устанавливалось приложение docker desktop c сайта [www.docker.com](https://www.docker.com/) + регистрация. Затем создавался приватный репозиторий.

Далее были созданы 2 файла, оба рабочие.

 - `dockerfile` - копирует dist в докер. Сборка приложения проводится вручную.

 сборка приложения: `npm run build` соберется в папку `dist`

 сборка: `docker build -t bktrml:one .`

 запуск: `docker run -p 8888:81 bktrml:one`

 - `dockerfile.two` - сам собирает приложение . Не нужно подключение к dev.

 сборка: `docker build -t bktrml:two -f dockerfile.multistage .`

 запуск: `docker run -p 8888:82 bktrml:two`

 - `dockerfile.multistage` - сам собирает приложение . Нужно подключение к dev и содержимое файла .npmrc, которое сейчас закомментировано.

 сборка: `docker build -t bktrml:three --build-arg NPM_LOGIN=логин --build-arg NPM_PASSWORD=пароль -f dockerfile.three .`

 запуск: `docker run -p 8888:83 bktrml:three`
