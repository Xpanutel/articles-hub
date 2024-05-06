<script>
export default {
  data() {
    return {
      error: '',
      publication: [],
      publications: 0,
      localTitle: '',
      localContent: '',
    }
  },
  props: {
    modalOpen: Boolean,
  },
  computed: {
    hasError() {
      return this.localTitle == '' || this.localContent == '';
    }
  },  
  methods: {
    // подводим итоги, публикуем пост и закрываем модалку
    validationError() {
      this.error = ''; // Сброс ошибки при каждом нажатии
      if (this.localTitle == '') {
        this.error = 'Заголовок не должен быть пустым';
      } else if (this.localContent == '') {
        this.error = 'Содержимое не должно быть пустым';
      }
    },
    // закрытие модалки
    closeModal() {
      this.$emit('close-modal');
    },
    publishPost() {
      if (!this.hasError) {
        this.$emit('send-data', {
          title: this.localTitle,
          content: this.localContent,
          postMes: { glTitle: this.localTitle, glContent: this.localContent }, 
          postMesKolvo: this.publications.length + 1, 
        });
        this.closeModal()
      }  
    }
  }
}  
</script>


<template>
  <div className='forms' v-if="modalOpen == true">
    <h1>Заполнителя поля чтобы создать публикацию</h1>
    <input type="text" placeholder="Введите заголовок" v-model="localTitle" @input="validationError" className="form">
    <textarea placeholder="Введите содержание" v-model="localContent" @input="validationError" className="form"></textarea>
    <p class="error" v-if="error != ''">{{ error }}</p>
    <button @click="publishPost" class="head_btn">Опубликовать</button>
    <button @click="closeModal" class="head_btn closed">Закрыть окно</button>
  </div>
</template>


<style scoped>
/* Стили для блока формы */
.forms {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 90%; /* Максимальная ширина формы */
  width: 600px; /* Ширина формы по умолчанию */
}

h1 {
  font-size: 25px;
  margin-bottom: 10px;
}

/* Стили для текстового поля */
.form {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

/* Стили для текстовой области */
.form textarea {
  width: calc(100% - 22px); /* Ширина минус паддинг и рамка */
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  resize: none;
}

/* Стили для сообщения об ошибке */
.error {
  color: red;
  margin: 5px 0px 15px 0px;
  font-size: 16px;
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .forms {
    width: 90%;
  }
}

@media (max-width: 576px) {
  .forms {
    width: 100%;
    padding: 10px;
  }

  h1 {
  font-size: 15px;
  margin-bottom: 10px;
}
}

</style>