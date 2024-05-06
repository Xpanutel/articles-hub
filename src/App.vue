<script>
import Forms from './components/forms.vue';
import Article from './components/article.vue'

export default {
  components: { Forms, Article},
  data () {
    return {
      postMes: [],
      postMesKolvo: 0,
      title: '',
      content: '',
      modalOpen: false,
    }
  },
  methods: {
    // открываем модальное окно
    openModal() {
      this.modalOpen = true;
    },
    receiveData(data) {
      this.title = data.title;
      this.content = data.content;
      this.postMes.push(data.postMes);
      this.postMesKolvo = data.postMesKolvo;
    },
    deletePost(index) {
      this.postMes.splice(index,1);
      this.postMesKolvo = this.postMesKolvo - 1;
    }
  }
}  
</script>


<template>
  <div className='container'>
    <h1 className='mainTitle'>Articles Hub</h1>
    <button @click='openModal'  className='head_btn'>Добавить запись</button>
    <div v-if="postMesKolvo == 0" className='post'>
      <h3 className='post__title'>Публикации отсутствуют</h3>
      <p className='post__content'>К сожалению, но на данный момент нет ни одной публикации на сайте. 
        Воспользуйтесь кнопкой "Добавить запись" для создание публикации.</p>
    </div> 

    <!-- передача методов туда - сюда -->
    <Forms @send-data="receiveData" :modalOpen="modalOpen" @close-modal="modalOpen = false"/>

    <!-- создаем цикл на перебор в массиве и создание новых
    записей при добавлении значений -->
    <div v-for="(el, index) in postMes" :key="index" className='post'>
      <h3 className='post__title'>{{ el.glTitle }}</h3>
      <p className='post__content'>{{ el.glContent }}</p>
      <button class='delete_post' @click="deletePost(index)">✖</button>
    </div>
  </div>  
</template>


<style>
.delete_post {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}

.delete_post:hover {
  text-decoration: underline;
}

/* Стили для контейнера */
.container {
  max-width: 800px;
  margin: 6% auto;
  padding: 0px 20px 25px 20px;
  border-radius: 50px;
  background: #b9ffa4;
  box-shadow: -22px 21px 32px 0px rgba(0, 0, 0, 0.40);
}

/* Заголовок */
.mainTitle {
  text-align: center;
  color: #001858;
  padding-top: 20px;
  font-size: 48px;
}

/* Стили для поста */
.post {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #000;
  background: #FFF2F2;
  box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.29);
  margin-bottom: 5px;
}

/* Заголовок поста */
.post__title {
  color: #001858;
  font-size: 24px;
  margin-top: 0;
}

/* Содержание поста */
.post__content {
  color: #001858;
  font-size: 16px;
  margin: 10px;
}

/* Стили для кнопки */
.head_btn {
  color: #001858;
  font-size: 16px;
  font-weight: bold;
  transition: 0.5s ease-in-out;
  padding: 10px;
  margin-bottom: 10px;
  background-color: aqua;
  border: 1px solid #001858;
  border-radius: 15px;
}

.closed { 
  background-color: #ff0000;
  margin-left: 10px;
}

.head_btn:hover {
  background-color: rgb(69, 190, 247);
}

.closed:hover {
  background-color: rgb(196, 4, 4);
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .container {
    margin: 10% auto;
  }
}

@media (max-width: 576px) {
  .container {
    margin: 20% auto;
    padding: 0px 10px 15px 10px;
    border-radius: 25px;
    font-size: 14px;
  }

  .mainTitle {
    font-size: 36px;
  }

  .post__title {
    font-size: 20px;
  }

  .post__content {
    font-size: 14px;
  }

  .head_btn {
    font-size: 14px;
    padding: 8px;
    margin-bottom: 8px;
  }
}
</style>