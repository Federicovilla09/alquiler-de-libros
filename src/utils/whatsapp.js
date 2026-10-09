const NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

// Arma el link que abre WhatsApp con un mensaje ya escrito
export function whatsappLink(message) {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`
}

// Botón "Consultar por WhatsApp"
export function askMessage(book) {
  return `¡Hola Mica! Vi *${book.title}* de ${book.author} en la Biblioteca de Letrita y quiero alquilarlo. ¿Está disponible?`
}

// Botón "Avisame cuando vuelva"
export function waitlistMessage(book) {
  return `¡Hola Mica! Me interesa *${book.title}*. ¿Me avisás cuando vuelva?`
}

// Botón "Preguntarle a Mica por WhatsApp"
export function searchMessage(query) {
  return `¡Hola Mica! Busqué «${query}» y no lo encontré. ¿Lo tenés o me recomendás algo parecido?`
}