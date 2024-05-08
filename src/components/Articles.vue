<script>
// импортируем библиотеку Axios
import axios from 'axios';

export default {
  data() {
    return {
      error: '', // ошибки
      publication: [], // массив для записей
      publicationCount: 0,
      newPost: { title: '', body: '' } // Объект для создания нового поста
    }
  },
  props: {
    modalOpen: Boolean, // получаем модальное окно сюда
  },
  mounted() {
    // Загрузка постов при загрузке страницы
    this.fetchPosts();
  },  
  methods: {
    // проверяем заголовок и содержание
    validationError() {
      this.error = ''; // Сброс ошибки при каждом нажатии
      if (this.newPost.title == '') {
        this.error = 'Заголовок не должен быть пустым';
      } else if (this.newPost.body == '') {
        this.error = 'Содержимое не должно быть пустым';
      }
    },
    // закрытие модалки
    closeModal() {
      this.$emit('close-modal');
    },
    // метод для удаления поста
    deletePost(index) {
      // Сохраняем ID поста, который хотим удалить
      const postIdToDelete = this.publication[index].id;
      // Удаляем пост из массива
      this.publication.splice(index, 1);
      // Отправляем запрос на сервер для удаления поста из JSON файла
      axios.delete(`http://localhost:3000/posts/${postIdToDelete}`)
        .then(response => {
          console.log('Post successfully deleted from JSON file');
          // Обновляем количество постов
          this.postMesKolvo = this.publication.length;
        })
        .catch(error => {
          console.error('Error deleting post from JSON file:', error);
        });
    },
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        this.publication = response.data;

        const postsCountResponse  = await axios.get('http://localhost:3000/publications');
        this.publicationCount = postsCountResponse.data.count;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    // Функция для создания нового поста
    async createPost() {
      try {
        const response = await axios.post('http://localhost:3000/posts', this.newPost);
        console.log('The post was created successfully:', response.data);
        // Очищаем форму после успешного создания поста
        this.publication.push(response.data);
        
        await axios.put('http://localhost:3000/publications', { count: this.publication.length });

        // Обновляем список постов
        this.fetchPosts();
        this.closeModal();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  }, 
}  
</script>


<template>
  <div class="forms_app">
    <div className='forms' v-if="modalOpen == true">
      <h1>Заполнителя поля чтобы создать публикацию</h1>
      <input type="text" placeholder="Введите заголовок" v-model="newPost.title" @input="validationError" className="form">
      <textarea placeholder="Введите содержание" v-model="newPost.body" @input="validationError" className="form"></textarea>
      <p class="error" v-if="error != ''">{{ error }}</p>
      <button @click="createPost" class="head_btn">Опубликовать</button>
      <button @click="closeModal" class="head_btn closed">Закрыть окно</button>
    </div>

    <div v-if="publication.title != '' && publication.body != ''">
      <div v-for="(posts, index) in publication" :key="index" className='post'>
      <h3 className='post__title'>{{ posts.title }}</h3>
      <p className='post__content'>{{ posts.body }}</p>
      <div>
        <button class='delete_post' @click="deletePost(index)">✖</button>
      </div>
    </div> 
    </div>

    <!-- показываем этот блок если у нас отсутствуют посты -->
    <div v-if="this.publication.length == 0" className='post'>
      <h3 className='post__title'>Публикации отсутствуют</h3>
      <p className='post__content'>К сожалению, но на данный момент нет ни одной публикации на сайте. 
        Воспользуйтесь кнопкой "Добавить запись" для создание публикации.</p>
    </div> 
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