
function eventDispatcher(eventType, element) {
  const event = new Event(eventType);
  element.dispatchEvent(event);
}

export function subtractFromAmount(element) {
  element.value = parseFloat(element.value) - 100;

  eventDispatcher('change', element);
}

export function addToAmount(element) {
  element.value = parseFloat(element.value) + 100;

  eventDispatcher('change', element);
}