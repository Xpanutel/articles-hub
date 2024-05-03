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
    </div>
  </div>  
</template>


<style>
.container {
  max-width: 800px;
  margin: 6% auto;
  padding: 0px 20px 25px 20px;
  border-radius: 50px;
  background: #b9ffa4;
  box-shadow: -22px 21px 32px 0px rgba(0, 0, 0, 0.40);
}

.mainTitle {
  text-align: center;
  color: #001858;
  padding-top: 20px;
  font-size: 48px;
}

.post {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #000;
  background: #FFF2F2;
  box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.29);
  margin-bottom: 5px;
}

.post__title {
  color: #001858;
  font-size: 24px;
  margin-top: 0;
}

.post__content {
  color: #001858;
  font-size: 16px;
  margin: 10px;
}

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

.head_btn:hover {
  color: #002df8;
  background-color: rgb(0, 195, 255);
}
</style>