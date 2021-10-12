
export function eventDispatcher(eventType, element) {
  const event = new Event(eventType);
  element.dispatchEvent(event);
};

export function subtractFromAmount(element, maskedElement) {
  maskedElement.setRawValue(parseFloat(maskedElement.getRawValue()) - 100);

  eventDispatcher('keyup', element);
};

export function addToAmount(element, maskedElement) {
  maskedElement.setRawValue(parseFloat(maskedElement.getRawValue()) + 100);

  eventDispatcher('keyup', element);
};

export function formatCurrency(value) {
  let currency = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return currency;
};