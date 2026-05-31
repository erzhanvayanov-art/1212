/* 
  Реализовать функцию calculateOrderTotal(xmlDoc), которая принимает XML-документ xmlDoc и возвращает общую стоимость заказа.

  Пример XML:
<order id="123">
  <items>
    <item productId="1" price="100" quantity="2"/>
    <item productId="2" price="50" quantity="3"/>
    <item productId="3" price="200" quantity="1"/>
  </items>
</order>
*/

export interface OrderWithPrices {
  id: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export function calculateOrderTotal(xmlDoc: Document): number {
  let total = 0;

  // Находим все item элементы
  const items = xmlDoc.getElementsByTagName('item');

  // Перебираем каждый item
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Получаем атрибуты price и quantity
    const price = parseFloat(item.getAttribute('price') || '0');
    const quantity = parseInt(item.getAttribute('quantity') || '0', 10);

    // Добавляем стоимость товара к общей сумме
    total += price * quantity;
  }

  return total;
}