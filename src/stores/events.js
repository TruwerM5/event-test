import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
export const useEventsStore = defineStore('events', () => {
  const events = ref([]);

  const dateStart = ref('');
  const dateEnd = ref('');
  const timeStart = ref('');
  const timeEnd = ref('');
  const error = ref(false);
  const organizer = ref('');
  const phone_number = ref('');
  const email = ref('');
  const city = ref('');
  const name = ref('');
  const details = ref('');
  const rating = ref('');
  const ratingList = ref([]);
  const address = ref('');
  const image = ref('');

  const nextId = ref(1);

  function validateForm() {
    
    if(!organizer.value) {
      error.value = 'Введите имя организатора';
      return true;
    }
    if(!phone_number.value || formatPhoneNumber()) {
      error.value = 'Введите корректный номер телефона';
      return true;
    }
    if(!email.value || validatedeEmail()) {
      // error.value = validatedeEmail();
      error.value = 'Введите корректный адрес эл. почты'
      return true;
    }
    if(!city.value) {
      error.value = 'Введите название города';
      return true;
    }
    if(!name.value) {
      error.value = 'Введите название';
      return true;
    }
    if(!image.value) {
      error.value = 'Добавьте фотографию';
      return true;
    }
    if(!address.value) {
      error.value = 'Введите адрес мероприятия';
      return true;
    }
    if(events.value.length < 1) {
      error.value = 'Добавьте дату и время';
      return true;
    }
    return false;
  }

  function addEvent(event) {
    events.value.push(event);
  };

  function removeEvent(id) {
    events.value = events.value.filter(event => event.id !== id);
  }

  function $reset() {
  events.value = [];

  dateStart.value = '';
  dateEnd.value = '';
  timeStart.value = '';
  timeEnd.value = '';
  error.value = false;
  organizer.value = '';
  phone_number.value = '';
  email.value = '';
  city.value = '';
  name.value = '';
  details.value = '';
  
  address.value = '';
  image.value = '';
  }
  function validatedeEmail(e) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email.value)) {
        return true;
    } 
    // else {
        // console.log('Passed');
        // error.value = '';
        // eventsStore[props.name] = field.value;
        // eventsStore.error = false;
    // }
    return false;
}
  function formatPhoneNumber(e) {
    
    let cleaned = phone_number.value.replace(/(?!^\+)\D/g, '');
    
    if(cleaned.length == 11 || cleaned.length == 12) {
        if(cleaned.startsWith(8) || cleaned.startsWith(7)) {
        cleaned = `${cleaned.substring(0,1)} (${cleaned.substring(1, 4)}) ${cleaned.substring(4,7)} ${cleaned.substring(7,9)} ${cleaned.substring(9, 11)}`;
        } else if(cleaned.startsWith('+')) {
            cleaned = `${cleaned.substring(0,2)} (${cleaned.substring(2, 5)}) ${cleaned.substring(5,8)} ${cleaned.substring(8,10)} ${cleaned.substring(10, 12)}`;
        } else {
          return true;
        }
    } else {
        error.value = 'Введите корректный номер телефона';
        return true;
    }
    error.value = '';
    phone_number.value = cleaned;
    return null;
}

  async function getRatings() {
    
    const req = await axios.get('/api/', {
      headers: {
        // 'Content-Type': 'text/plain',
        'Authorization': 'Basic dXNlcjoxMjM0NQ=='
      },
      method: 'GET',
      withCredentials: false,
      
    });
    
    return await req.data.data;
  }

  return { 
    events, 
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    error,
    organizer,
    phone_number,
    email,
    city,
    name,
    details,
    rating,
    ratingList,
    address,
    image,
    nextId,
    validateForm,
    addEvent, 
    removeEvent,
    getRatings,
    $reset
  }
})
