import { Message } from "@/components/whatsapp-chat.tsx";

const MESSAGES: Message[] = [
	{
		id: 1,
		text: <span>Добрый день, Шерхан! Спасибо за заказ в нашем МАГАЗИНЕ КАСПИ. <br/>
Вы заказали: Ирригатор <br/>
Плановая дата доставки в Postamat: 03.05.2025. <br/>
В ближайшее время мы соберём заказ и отправим вам.
</span>,
		sender: "user",
		timestamp: "13:30",
		date: new Date(2025, 4, 3),
	},
	{
		id: 2,
		text: <span>Добрый день, Диана!  <br/>
            Спасибо, жду.</span>,
		sender: "other",
		name: "Покупатель",
		timestamp: "13:31",
		date: new Date(2025, 4, 3),
	},
	{
		id: 3,
		text: <span>Добрый вечер, Шерхан! Это Диана 😊 <br/>

Ваш заказ передан в доставку. <br/>
            Следите за ним тут: <span className="text-blue-600">https://shop.kaspi.kz/ords/f?p=104:1:::::P1_EXT_GUID. </span><br/>
<br/>
Курьер позвонит перед приездом — держите телефон рядом. <br/>
Если будут вопросы, звоните на 9999, всё решим! <br/>
<br/>
            Хорошего дня!</span>,
		sender: "user",
		timestamp: "19:33",
		date: new Date(2025, 4, 3),
	},
	{
		id: 4,
		text: "Рахмет, жду. классный сервис 🔥",
		sender: "other",
		name: "Покупатель",
		timestamp: "19:34",
		date: new Date(2025, 4, 3),
	},
	{
		id: 5,
		text: <span>Доброе утро, Шерхан! 😊 <br/>
Диана из МАГАЗИНА КАСПИ на связи. <br/>
<br/>
Уже получили заказ? Как вам ирригатор? <br/>
            Буду рада, если поделитесь впечатлениями — это очень помогает нам!<br/></span>,
		sender: "user",
		timestamp: "09:32",
		date: new Date(2025, 4, 4),
	},
	{
		id: 6,
		text: "Рақмет Диана, все классно! Зубы отбелились",
		sender: "other",
		name: "Покупатель",
		timestamp: "09:45",
		date: new Date(2025, 4, 4),
	},
	{
		id: 7,
		text: <span>Доброе утро, Шерхан! <br/>
<br/>
Огромное спасибо за ваш отзыв! 🥳 Это правда вдохновляет. <br/>
Вы заказали: Ирригатор. <br/>
<br/>
Если найдётся минутка, оставьте, пожалуйста, пару слов тут: <br/>
<span className="text-blue-600">https://kaspi.kz/shop/review/productreview?orderCode=542287042&productCode=122100137&rating=5</span><br/>
Каждое ваше мнение помогает нам расти! <br/>
<br/>
— Диана, МАГАЗИН КАСПИ</span>,
		sender: "user",
		timestamp: "09:45",
		date: new Date(2025, 4, 4),
	},
	{
		id: 8,
		text: "Обязательно поставлю 5 звезд 🔥",
		sender: "other",
		name: "Покупатель",
		timestamp: "09:46",
		date: new Date(2025, 4, 4),
	},
]

export { MESSAGES }