<template>
   <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/stat.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
  <div>
    <h1 class="text-4xl font-bold">FreeTrial</h1>
    <p class="text-lg">EYS-Kidsでのびのびダンスレッスン！</p>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Pic.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <input type="text" v-model="name" placeholder="お名前" required />
      <input type="email" v-model="email" placeholder="メールアドレス" required />
      <button type="submit">申し込む</button>
    <div class="flow-description">
      <p>お申込みから無料体験レッスン受講までの流れ</p>
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/card.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div>
    <h1 class="text-4xl font-bold">FreeTrial</h1>
    <p class="text-lg">EYS-Kidsでのびのびダンスレッスン！</p>
    <p class="text-lg">無料体験レッスンお申し込み</p>
    <form @submit.prevent="submitForm">
      <div>
        <label>お子様のお名前（漢字）</label>
        <input type="text" v-model="childNameKanji" required />
      </div>
      <div>
        <label>お子様のお名前（かな）</label>
        <input type="text" v-model="childNameKana" required />
      </div>
      <div>
        <label>お子様の性別</label>
        <div>
          <label><input type="radio" v-model="gender" value="男の子" required /> 男の子</label>
          <label><input type="radio" v-model="gender" value="女の子" required /> 女の子</label>
        </div>
      </div>
      <div>
        <label>お子様の学年</label>
        <select v-model="grade" required>
          <option value="年少未満">年少未満</option>
          <option value="年少">年少</option>
          <option value="年中">年中</option>
          <option value="年長">年長</option>
          <option value="小学生">小学生</option>
        </select>
        </div>
        </form>
      </div>
      <div></div>
  </div>
    <p class="text-lg">無料体験レッスンお申し込み</p>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="name" placeholder="お名前" required />
      <input type="email" v-model="email" placeholder="メールアドレス" required />
      <button type="submit">申し込む</button>
    </form>
    <div class="course-selection">
      <p>コース一覧から選ぶ</p>
      <p>インストラクターから選ぶ</p>
    </div>
    
    <div class="flex-container">
        <button class="course-button">HIP-HOP</button>
        <button class="course-button">Jazz</button>
        <button class="course-button">Kids Rhythm Dance</button>
        <button class="course-button">Theme Park Dance</button>
        <button class="course-button">Lock</button>
        <button class="course-button">Contemporary</button>
        <button class="course-button">House</button>
        <button class="course-button">Breakin' / Acrobat</button>
      </div>
      <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/flan.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="space-selection">
      <p>ご希望のスペース</p>
      <button class="space-button">選択する</button>
    </div>
    <Form />
    <div>
      <h2>ご希望のスケジュール</h2>
      <label>
        <input type="radio" name="schedule" value="平日" required />
        平日
      </label>
      <label>
        <input type="radio" name="schedule" value="祝休日" required />
        祝休日
      </label>
    </div>

    <div>
      <h2>ご希望の時間帯</h2>
      <label>
        <input type="radio" name="time" value="10時〜14時" required />
        10時〜14時
      </label>
      <label>
        <input type="radio" name="time" value="14時〜18時" required />
        14時〜18時
      </label>
      <label>
        <input type="radio" name="time" value="18時〜21時" required />
        18時〜21時
      </label>
    </div>
    <div>
      <h2>キャンペーンコード</h2>
      <input type="text" placeholder="キャンペーンコードがあれば入力" />
    </div>
    <FooterBanner />
    <router-link to="/news" class="view-more-btn">VIEW MORE →</router-link>
    
</template>

<script>
import FooterBanner from '/components/FooterBanner.vue';
import Form from '/components/Form.vue';
export default {
  methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push("/news");
    },
  },
  name: "freetrial",
  components: {
    Form,
    FooterBanner,
  },
  data() {
    return {
      childNameKanji: '',
      childNameKana: '',
      gender: '',
      grade: '',
      phone: '',
      email: '',
      name: '',
      email: '',
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log(`Child Name (Kanji): ${this.childNameKanji}, Child Name (Kana): ${this.childNameKana}, Gender: ${this.gender}, Grade: ${this.grade}, Phone: ${this.phone}, Email: ${this.email}`);
    },
  },
};
</script>

<style scoped>
/* Add any specific styles here */
.flow-description {
  background-color: #ffcccc; /* Change color as needed */
  padding: 10px;
  margin-top: 20px;
  text-align: center;
}
.course-selection {
  background-color: #e0f7fa; /* Change color as needed */
  padding: 10px;
  margin-top: 20px;
  text-align: center;
}
.course-selection {
  margin-top: 20px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.course-button {
  background-color: #e0f7fa; /* Change color as needed */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.course-button:hover {
  background-color: #b2ebf2; /* Change color on hover */
}
.space-selection {
  margin-top: 20px;
}

.space-button {
  background-color: #ffcccc; /* Change color as needed */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.view-more {
  margin-top: 20px;
  text-align: center;
}

.view-more button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.view-more button:hover {
  background-color: #0056b3;
}
form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
}
input, select {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
button:hover {
  background-color: #0056b3;
}

</style>
