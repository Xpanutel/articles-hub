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
    <input type="text" placeholder="Введите заголовок" v-model="localTitle" @input="validationError" className="form">
    <input type="text" placeholder="Введите содержание" v-model="localContent" @input="validationError" className="form">
    <p class="error" v-if="error != ''">{{ error }}</p>
    <button @click="publishPost" class="head_btn">Опубликовать</button>
  </div>
</template>


<style scoped>
.forms {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
}

.form {
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}
</style>